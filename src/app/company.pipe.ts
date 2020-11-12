import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'compPipe'
})
export class CompanyPipe implements PipeTransform{
    transform(value:string){
        return value.substring(0,value.indexOf('Pvt'));
    }
}