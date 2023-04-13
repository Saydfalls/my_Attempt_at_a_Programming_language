/* Variables */
const lexeme = []
let nextToken

/* Character classes */
let LETTER = 0
let DIGIT = 1
let UNKNOWN = 99

/* Token codes */
// booleans
var ASS = 2
var EQU = 3
var LES = 4
var GRE = 5
var LEQ = 6
var GEQ = 7
var AND = 8
var OR = 9
// operators
var ADD = 11
var SUB = 12
var MUL = 21
var DIV = 22
var MOD = 23
// groupings
var L_PAR = 31
var R_PAR = 32
var L_BRACK = 33
var R_BRACK = 34
// grammar specs
var COMMA = 40
var SEMICOLON = 41
var DOT = 42
// id's and literals
var ID = 50
var INT_LIT = 51
var FLOAT_LIT = 52
// code block stuff
var IF_CODE = 60
var ELSE_CODE = 61
var WHILE_CODE = 62

var FILE = prompt("Enter the file in which you wish to read: ")

fs.readFile(FILE,(err,data) => {
    if (err) throw err;
    FILE = data.toString()  
}
);

const fContents = FILE.split("")
const fContentsUntouched = FILE.split("")
const fOutput = []
let OpCount = 0;

let i =0
for (;i < fContents.length;){
    if(isNaN(fContents[i])){
        if(isLETTER(fContents[i])){
            fContents[i] = LETTER
        }else{
            if(isOp(fContents[i])){
                fContents[i] = whichOp(fContents[i])
            }else{
                if(isGrouping(fContents[i])){
                    fContents[i] = whichGrouping(fContents[i])
                }else{
                    if(isGrammar(fContents[i])){
                        fContents[i] = whichGrammar(fContents[i])
                    }else{
                        fContents[i] = UNKNOWN
                        if(fContents[i] == UNKNOWN) throw err;
                    }
                }
            }
        }
    }else{
        fContents[i] = INT_LIT
    }
    i++
}

let outputTracker = 0
for(i = 0; i < fContents.length; i++){

    switch(fContents[i]){
        case LETTER:
            switch(fContentsUntouched[i]){
                case "i":
                    if(ifCodeCheck(fContentsUntouched[i],fContentsUntouched[i+1],fContentsUntouched[i+2])){ // checks for an if, else, or while code
                        fOutput[outputTracker] = IF_CODE
                        i++
                    }
                    break
                case "e":
                    if(elseCodeCheck(fContentsUntouched[i],fContentsUntouched[i+1],fContentsUntouched[i+2],fContentsUntouched[i+3],fContentsUntouched[i+1])){
                        fOutput[outputTracker] = ELSE_CODE
                        i += 3
                    }
                    break
                case "w":
                    if(whileCodeCheck(fContentsUntouched[i],fContentsUntouched[i+1],fContentsUntouched[i+2],fContentsUntouched[i+3],fContentsUntouched[i+4],fContentsUntouched[i+5])){
                        fOutput[outputTracker] = WHILE_CODE
                        i += 4
                    }
                    break
            }      
            break
        case INT_LIT:
            let intChecker = intCheck(fContents.slice(i,fContents.length))
            i += intChecker
            if(fContents[i] == DOT){
                i++
                intChecker = intCheck(fContents.slice(i,fContents.length))
                i += intChecker
                fOutput[outputTracker] = FLOAT_LIT
            }else{
                fOutput[outputTracker] = INT_LIT
            }
            break
        case L_PAR:
            fOutput[outputTracker] = L_PAR
            break
        case R_PAR:
            fOutput[outputTracker] = R_PAR
        case L_BRACK:
            fOutput[outputTracker] = L_BRACK
            break
        case R_BRACK:
            fOutput[outputTracker] = R_BRACK
            break
                    
    }
    outputTracker++
}

function isLETTER(str){
    if(str.length === 1 && str.match(/[A-Z|a-z]/i)){
        return true
    }
    return false
}


function isOp(str){
    if(str.match("=") || str.match("+") || str.match("-") || str.match("/") || str.match("*") || str.match("%") || str.match("")){
        return true
    }
    return false
}

function whichOp(str){
    switch(str){        
        case "+":
            return ADD
        case "-":
            return SUB
        case "/":
            return DIV
        case "*":
            return MUL
        case "%":
            return MOD
        case "=":
            return ASS
    }
}


function isGrouping(str){
    if(str.match("(") || str.match(")") || str.match("{") || str.match("}") || str.match("[") || str.match("]")){
        return true
    }
    return false
}

function whichGrouping(str){
    switch(str){
        case "(":
            return L_PAR
        case ")":
            return R_PAR
        case "{":
            return L_BRACK
        case "}":
            return R_BRACK
        case "[":
            return L_BRACE
        case "]":
            return R_BRACE
    }    
}


function isGrammar(str){
    if(str.match(".") || str.match(",") || str.match(";")){
        return true
    }
    return false
}

function whichGrammar(str){
    switch(str){
        case ".":
            return DOT
        case ",":
            return COMMA
        case ";":
            return SEMICOLON
    }
}


function ifCodeCheck(str1,str2,str3){
    let potIF = str1.concat(str2)
    if(potIF.matches("if") && (str3.matches(" ") || str3.matches("("))){
        return true
    }
    return false
}

function elseCodeCheck(str1,str2,str3,str4,str5){
    let potELSE = str1.concat(str2,str3,str4)
    if(potELSE.matches("else") && (str6.matches(" ") || str6.matches("("))){
        return true
    }
    return false
}

function whileCodeCheck(str1,str2,str3,str4,str5,str6){
    let potWHILE = str1.concat(str2,str3,str4,str5)
    if(potWHILE.matches("while") && (str6.matches(" ") || str6.matches("("))){
        return true
    }
    return false
}
