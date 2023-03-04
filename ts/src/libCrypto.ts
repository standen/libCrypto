import { table } from './table';
import { encode, decode } from './encoding';

export class Gost {
    table: number[];
    arrayS: number[];
    arraySinv: number[];
    LConst: number[];
    keyConst: number[][];
    keys: number[][];

    constructor(key: string) {
        this.table = table;
        this.arrayS = [252, 238, 221, 17, 207, 110, 49, 22, 251, 196, 250, 218, 35, 197, 4, 77, 233, 119, 240, 219, 147, 46,
            153, 186, 23, 54, 241, 187, 20, 205, 95, 193, 249, 24, 101, 90, 226, 92, 239, 33, 129, 28, 60, 66,
            139, 1, 142, 79, 5, 132, 2, 174, 227, 106, 143, 160, 6, 11, 237, 152, 127, 212, 211, 31, 235, 52, 44,
            81, 234, 200, 72, 171, 242, 42, 104, 162, 253, 58, 206, 204, 181, 112, 14, 86, 8, 12, 118, 18, 191,
            114, 19, 71, 156, 183, 93, 135, 21, 161, 150, 41, 16, 123, 154, 199, 243, 145, 120, 111, 157, 158,
            178, 177, 50, 117, 25, 61, 255, 53, 138, 126, 109, 84, 198, 128, 195, 189, 13, 87, 223, 245, 36, 169,
            62, 168, 67, 201, 215, 121, 214, 246, 124, 34, 185, 3, 224, 15, 236, 222, 122, 148, 176, 188, 220,
            232, 40, 80, 78, 51, 10, 74, 167, 151, 96, 115, 30, 0, 98, 68, 26, 184, 56, 130, 100, 159, 38, 65,
            173, 69, 70, 146, 39, 94, 85, 47, 140, 163, 165, 125, 105, 213, 149, 59, 7, 88, 179, 64, 134, 172,
            29, 247, 48, 55, 107, 228, 136, 217, 231, 137, 225, 27, 131, 73, 76, 63, 248, 254, 141, 83, 170, 144,
            202, 216, 133, 97, 32, 113, 103, 164, 45, 43, 9, 91, 203, 155, 37, 208, 190, 229, 108, 82, 89, 166,
            116, 210, 230, 244, 180, 192, 209, 102, 175, 194, 57, 75, 99, 182];
        this.arraySinv = [165, 45, 50, 143, 14, 48, 56, 192, 84, 230, 158, 57, 85, 126, 82, 145, 100, 3, 87, 90, 28, 96, 7,
            24, 33, 114, 168, 209, 41, 198, 164, 63, 224, 39, 141, 12, 130, 234, 174, 180, 154, 99, 73, 229,
            66, 228, 21, 183, 200, 6, 112, 157, 65, 117, 25, 201, 170, 252, 77, 191, 42, 115, 132, 213, 195,
            175, 43, 134, 167, 177, 178, 91, 70, 211, 159, 253, 212, 15, 156, 47, 155, 67, 239, 217, 121, 182,
            83, 127, 193, 240, 35, 231, 37, 94, 181, 30, 162, 223, 166, 254, 172, 34, 249, 226, 74, 188, 53,
            202, 238, 120, 5, 107, 81, 225, 89, 163, 242, 113, 86, 17, 106, 137, 148, 101, 140, 187, 119, 60,
            123, 40, 171, 210, 49, 222, 196, 95, 204, 207, 118, 44, 184, 216, 46, 54, 219, 105, 179, 20, 149,
            190, 98, 161, 59, 22, 102, 233, 92, 108, 109, 173, 55, 97, 75, 185, 227, 186, 241, 160, 133, 131,
            218, 71, 197, 176, 51, 250, 150, 111, 110, 194, 246, 80, 255, 93, 169, 142, 23, 27, 151, 125, 236,
            88, 247, 31, 251, 124, 9, 13, 122, 103, 69, 135, 220, 232, 79, 29, 78, 4, 235, 248, 243, 62, 61,
            189, 138, 136, 221, 205, 11, 19, 152, 2, 147, 128, 144, 208, 36, 52, 203, 237, 244, 206, 153, 16,
            68, 64, 146, 58, 1, 38, 18, 26, 72, 104, 245, 129, 139, 199, 214, 32, 10, 8, 0, 76, 215, 116];
        this.LConst = [148, 32, 133, 16, 194, 192, 1, 251, 1, 192, 194, 16, 133, 32, 148, 1];
        this.keyConst = [[110, 162, 118, 114, 108, 72, 122, 184, 93, 39, 189, 16, 221, 132, 148, 1],
        [220, 135, 236, 228, 216, 144, 244, 179, 186, 78, 185, 32, 121, 203, 235, 2],
        [178, 37, 154, 150, 180, 216, 142, 11, 231, 105, 4, 48, 164, 79, 127, 3],
        [123, 205, 27, 11, 115, 227, 43, 165, 183, 156, 177, 64, 242, 85, 21, 4],
        [21, 111, 109, 121, 31, 171, 81, 29, 234, 187, 12, 80, 47, 209, 129, 5],
        [167, 74, 247, 239, 171, 115, 223, 22, 13, 210, 8, 96, 139, 158, 254, 6],
        [201, 232, 129, 157, 199, 59, 165, 174, 80, 245, 181, 112, 86, 26, 106, 7],
        [246, 89, 54, 22, 230, 5, 86, 137, 173, 251, 161, 128, 39, 170, 42, 8],
        [152, 251, 64, 100, 138, 77, 44, 49, 240, 220, 28, 144, 250, 46, 190, 9],
        [42, 222, 218, 242, 62, 149, 162, 58, 23, 181, 24, 160, 94, 97, 193, 10],
        [68, 124, 172, 128, 82, 221, 216, 130, 74, 146, 165, 176, 131, 229, 85, 11],
        [141, 148, 45, 29, 149, 230, 125, 44, 26, 103, 16, 192, 213, 255, 63, 12],
        [227, 54, 91, 111, 249, 174, 7, 148, 71, 64, 173, 208, 8, 123, 171, 13],
        [81, 19, 193, 249, 77, 118, 137, 159, 160, 41, 169, 224, 172, 52, 212, 14],
        [63, 177, 183, 139, 33, 62, 243, 39, 253, 14, 20, 240, 113, 176, 64, 15],
        [47, 178, 108, 44, 15, 10, 172, 209, 153, 53, 129, 195, 78, 151, 84, 16],
        [65, 16, 26, 94, 99, 66, 214, 105, 196, 18, 60, 211, 147, 19, 192, 17],
        [243, 53, 128, 200, 215, 154, 88, 98, 35, 123, 56, 227, 55, 92, 191, 18],
        [157, 151, 246, 186, 187, 210, 34, 218, 126, 92, 133, 243, 234, 216, 43, 19],
        [84, 127, 119, 39, 124, 233, 135, 116, 46, 169, 48, 131, 188, 194, 65, 20],
        [58, 221, 1, 85, 16, 161, 253, 204, 115, 142, 141, 147, 97, 70, 213, 21],
        [136, 248, 155, 195, 164, 121, 115, 199, 148, 231, 137, 163, 197, 9, 170, 22],
        [230, 90, 237, 177, 200, 49, 9, 127, 201, 192, 52, 179, 24, 141, 62, 23],
        [217, 235, 90, 58, 233, 15, 250, 88, 52, 206, 32, 67, 105, 61, 126, 24],
        [183, 73, 44, 72, 133, 71, 128, 224, 105, 233, 157, 83, 180, 185, 234, 25],
        [5, 108, 182, 222, 49, 159, 14, 235, 142, 128, 153, 99, 16, 246, 149, 26],
        [107, 206, 192, 172, 93, 215, 116, 83, 211, 167, 36, 115, 205, 114, 1, 27],
        [162, 38, 65, 49, 154, 236, 209, 253, 131, 82, 145, 3, 155, 104, 107, 28],
        [204, 132, 55, 67, 246, 164, 171, 69, 222, 117, 44, 19, 70, 236, 255, 29],
        [126, 161, 173, 213, 66, 124, 37, 78, 57, 28, 40, 35, 226, 163, 128, 30],
        [16, 3, 219, 167, 46, 52, 95, 246, 100, 59, 149, 51, 63, 39, 20, 31],
        [94, 167, 216, 88, 30, 20, 155, 97, 241, 106, 193, 69, 156, 237, 168, 32]];

        // this.keys = this.keyGer(key) //- для ТЕСТА
        this.keys = this.keyGer(this.share(encode(key), 32));
    }
 
    keyGer(key: number[]): number[][] {
        let keys: number[][] = [key.slice(0, 16), key.slice(16)],
            temp: number[] = [],
            left: number[] = keys[0],
            right:number[] = keys[1];
        for (let i = 0; i < 4; i++) {
            for (let k = 0; k < 8; k++){
                temp = left;
                left = this.X(this.LSX(left, this.keyConst[8*i+k]), right);
                right = temp;
            }
            keys.push(left, right);
        }
        return keys;
    }

    X = (a: number[], b: number[]): number[] => a.map((item, i) => item ^ b[i]);

    S = (indata: number[]): number[] => indata.map(item => this.arrayS[item]);

    SRev = (indata: number[]): number[] => indata.map(item => this.arraySinv[item]);

    L (indata: number[]): number[] {
        for (let i = 0; i < 16; i++) {
            let sum: number = 0;
            for (let k = 0; k < 16; k++) {
                sum ^= this.table[indata[k] * 256 + this.LConst[k]] 
            }
            indata.unshift(sum);
            indata.pop();
        }
        return indata;
    }

    LRev(indata: number[]): number[] {
        let temp: number[], sum: number;
        for (let i = 0; i < 16; i++){
            temp = indata.slice(1);
            temp.push(indata[0]);
            sum = 0;
            for(let k = 0; k < 16; k++){
                sum ^= this.table[temp[k] * 256 + this.LConst[k]];
            }
            indata = temp.slice(0, 15);
            indata.push(sum);
        }
        return indata;
    }

    LSX = (pt: number[], key: number[]): number[] => this.L(this.S(this.X(pt, key)));

    SLX = (pt: number[], key: number[]): number[] => this.SRev(this.LRev(this.X(pt, key)));

    encrypt(pt: number[]): number[] {
        for (let i = 0; i < 9; i++) {
            pt = this.LSX(pt, this.keys[i]);
        }
        return this.X(pt, this.keys[9]);
    }

    decrypt(pt: number[]): number[] {
        for (let i = 0; i < 9; i++) {
            pt = this.SLX(pt, this.keys[9 - i]);
        }
        return this.X(pt, this.keys[0]);
    }

    // strToInt = indata => indata.split('').map(item => item.charCodeAt());

    // intToStr = indata => indata.map(item => String.fromCharCode(item)).join(''); 

    jsStrToInt = (indata: string): number[] => indata.split(';').map(item => Number(item));

    jsIntToStr = (indata: number[]): string => indata.map((item, i, arr) => i != arr.length - 1 ? `${item.toString()};` : item.toString()).join('');

    share (indata: number[], len: number): number[] {
        if (len == 32) {
            while (indata.length < 32) {
                indata = indata.concat(indata);
            }
            indata = indata.slice(0, 32);
        } else {
            while (indata.length != 16) {
                indata.push(0);
            }
        }
        return indata;
    }

    enc(indata: string): string {
        let data: number[] = encode(indata),
            crypted: number[] = [],
            temp: number[] = [];
        while(data.length != 0) {
            if (data.length < 16) { data = this.share(data, 16); }
            temp = this.encrypt(data.slice(0, 16));
            // crypted = [...temp];
            crypted = crypted.concat(temp);
            data = data.slice(16);
        }
        return this.jsIntToStr(crypted);
    }

    dec(indata: string): string {
        let data: number[] = this.jsStrToInt(indata),
            decrypted: number[] = [];
        while (data.length != 0) {
            decrypted = decrypted.concat(this.decrypt(data.slice(0, 16)));
            data = data.slice(16);
        }
        decrypted = decrypted.filter(item => item != 0);
        return decode(decrypted);
    }
}

class Test {
    hexToInt(indata: string[]) { 
            let out = [],
                i: number = 0;
        while (i < indata.length) {
            out.push(parseInt(indata[i] + indata[i+1], 16));
            i += 2;
        }
        return out;
    }

    intToHex(indata: number[]) { 
        let out = '';
        indata.forEach(item => {
            out += item.toString(16);
        });
        return out;
    }
}

const key = '8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef',
    ctkey = 'bb44e25378c73123a5f32f73cdb6e51772e9dd7416bcf45b755dbaa88e4a4043',
    pt = '1122334455667700ffeeddccbbaa9988',
    ct = '7f679d90bebc24305a468d42b9d4edcd';

let msg = {
    pt: 'что-то',
    key: 'ключ',
    ct: '16;108;106;84;122;182;155;213;133;88;70;148;7;155;116;16'
}

