export class ConversorBoolean{
    private static _EnumEstate={
        true:'1',
        false:'0'
    }
    static verifier(param:string,to:string){
        return (param==to)
    }
    static verifierinverse(param:boolean):string{
        return this._EnumEstate[`${param}`]
    }
}