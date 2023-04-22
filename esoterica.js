class RDA{
   initialize(tokens){
        this.tokens = tokens
        this.current = 0
        this.currentToken = tokens[this.current]
   }
   getNextToken(){
        if(this.current < this.tokens.length){
            this.current++
        }
        this.currentToken = this.tokens[this.current]
   }
   stmt(){
        switch(this.currentToken){
            case 'during':
                this.while_stmt
                break
            case 'potentially':
                this.if_stmt
                break
            case 'id':
                this.varOp
                break
            case '{':
                this.block
                break
            default:
                this.error
        }
   }
   start(){
        if(this.currentToken == 'start'){
            this.getNextToken
            this.stmt
        }else{
            this.error
        }
   }
   block(){
        if(this.currentToken == '{'){
            this.getNextToken
            while(this.currentToken == 'during' || this.currentToken == 'potentially' || this.currentToken == 'id' || this.currentToken == '{'){
                this.stmt
                if(this.currentToken == ';'){
                    this.getNextToken
                    this.stmt
                }else{
                    this.error
                }
            }
            if(this.currentToken == '}'){
                this.getNextToken
            }else{
                this.error
            }
        }else{
            this.error
        }
   }
   if_stmt(){
        if(this.currentToken == 'potentially'){
            this.getNextToken
            if(this.currentToken == '('){
                this.getNextToken
                this.boolExpr
                if(this.currentToken == ')'){
                    this.getNextToken
                    this.block
                }else{
                    this.error
                }
            }else if(this.currentToken == 'int_lit'){
                this.getNextToken
                this.block
            }else{
                this.error
            }
        }else{
            this.error
        }
   }
   while_stmt(){
        if(this.currentToken == 'during'){
            this.getNextToken
            if(this.currentToken == '('){
                this.getNextToken
                this.boolExpr
                if(this.currentToken == ')'){
                    this.getNextToken
                    this.block
                    if(this.currentToken == 'otherwise'){
                        this.getNextToken
                        this.block
                    }
                }else{
                    this.error
                }
            }else{
                this.error
            }
        }else{
            this.error
        }
   }

   boolExpr(){
    this.bool
    while(this.currentToken == '&&'){
        this.getNextToken
        this.bool
    }
   }
   bool(){
        this.equalsOp
        while(this.currentToken == '||'){
            this.getNextToken
            this.equalsOp
        }
   }
   equalsOp(){
        this.relOp
        while(this.currentToken == '!=' || this.currentToken == '=='){
            this.getNextToken
            this.relOp
        }
   }
   relOp(){
        this.boolExpr
        while(this.currentToken == '<=' || this.currentToken == '>=' || this.currentToken == '>' || this.currentToken == '<'){
            this.getNextToken
            this.boolExpr
        }
   }
   boolExpr(){
        this.Bterm
        while(this.currentToken == '*' || this.currentToken == '/' || this.currentToken == '%'){
            this.getNextToken
            this.Bterm
        }
   }
   Bterm(){
        this.boolFactor()
        while(this.currentToken == '+' || this.currentToken == '-'){
            this.getNextToken
            this.boolFactor
        }
   }
   boolFactor(){
        if(this.currentToken == 'id' || this.currentToken == 'int_lit'){
            this.getNextToken
        }else if(this.currentToken == '('){
            this.getNextToken
            this.boolExpr
            if(this.currentToken == ')'){
                this.getNextToken
            }else{
                this.error
            }
        }else{
            this.error
        }
   }

   varOp(){
        if(this.currentToken == 'id'){
            this.getNextToken
            if(this.currentToken == 'intOne' || this.currentToken =='intTwo' || this.currentToken =='intThree' || this.currentToken =='intFour'){
                this.getNextToken
            }else if(this.currentToken == '='){
                this.getNextToken
                this.expression
            }else{
                this.error
            }
        }
   }
   expression(){
        this.term
        while(this.currentToken == '*' || this.currentToken == '/' || this.currentToken == '%'){
            this.getNextToken
            this.term
        }
   }
   term(){
        this.fact
        while(this.currentToken == '+' || this.currentToken == '-'){
            this.getNextToken
            this.fact
        }
   }
   error(){
    print("ERROR DUMMY")
   }
   fact(){
        if(this.currentToken == 'id' || this.currentToken == 'int_lit'){
            this.getNextToken
        }else if(this.currentToken == '('){
            this.getNextToken
            this.expression
            if(this.currentToken == ')'){
                this.getNextToken
            }else{
                this.error
            }
        }else{
            this.error
        }
   }
}

function isVar(stringy){
    return stringy.match(/[a-zA-Z{6,8}|_]/g)
}
function isNum(stringy){
    if(stringy.match(/[0-9]/g)){
        return true
    }else{
        return false
    }
}

class lexer{ // lexes the way a lexer does
    initialize(stringy){
        this.stringy = stringy
    }
    error(){
        throw new Error("Don't make errors PLEASE")
    }
    lexChecker(){
        let tokenList = []
        for(let i = 0; i < this.stringy.length; i++){
            switch(this.stringy[i]){
                case "strange:":
                    tokenList[i] = 'start'
                    break
                case "!unstrange!":
                    tokenList[i] = 'END'
                    break
                case "potentially":
                    tokenList[i] = 'potentially'
                    break
                case "otherwise":
                    tokenList[i] = 'otherwise'
                    break
                case "during":
                    tokenList[i] = 'during'
                    break
                case "intOne":
                    tokenList[i] = 'intOne'
                    break
                case "intTwo":
                    tokenList[i] = 'intTwo'
                    break
                case "intThree":
                    tokenList[i] = 'intThree'
                    break
                case "intFour":
                    tokenList[i] = 'intFour'
                    break
                case "+":
                    tokenList[i] = '+'
                    break
                case "-":
                    tokenList[i] = '-'
                    break
                case "*":
                    tokenList[i] = '*'
                    break
                case "/":
                    tokenList[i] = '/'
                    break
                case "%":
                    tokenList[i] = '%'
                    break
                case ">":
                    tokenList[i] = '>'
                    break
                case ">=":
                    tokenList[i] = '>='
                    break
                case "<":
                    tokenList[i] = '<'
                    break
                case "<=":
                    tokenList[i] = '<='
                    break
                case "==":
                    tokenList[i] = '=='
                    break
                case "!=":
                    tokenList[i] = '!='
                    break
                case "{":
                    tokenList[i] = '{'
                    break
                case "}":
                    tokenList[i] = '}'
                    break
                case "(":
                    tokenList[i] = '('
                    break
                case ")":
                    tokenList[i] = ')'
                    break
                case "=":
                    tokenList[i] = '='
                    break
                case ";":
                    tokenList[i] = ';'
                    break
                case "&&":
                    tokenList[i] = '&&'
                    break
                case "||":
                    tokenList[i] = '||'
                    break
                case isNum(this.stringy[i]):
                    tokenList[i] = 'int_lit'
                    break
                case isVar(this.stringy[i]):
                    tokenList[i] = 'id'
                    break
                default:
                    print(i)
                    this.error
            }
        }
        return tokenList
    }
}

//enter file name to test file
let FILE1 = require('test.txt') // make sure to include full file path for this to work
let data = FILE1.readfile('test.txt')
const lexemes = data.split()
let tokenString = lexer(lexemes)
let token = tokenString.checkLex()
print(token)
let test = RDA(token)
test.start()