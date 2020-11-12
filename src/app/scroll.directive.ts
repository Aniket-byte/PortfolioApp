import { Directive, HostListener, Input, ElementRef, Renderer2, OnDestroy } from "@angular/core";

@Directive({
    selector:"[animateOnScroll]"
})
export class ScrollDirective implements OnDestroy{

    @Input() animationName:string;
    @Input() offset:number=0;
    @Input() delay:number=0;
    @Input() threshhold:number=0;
    timeout:any;

    constructor(private elRef:ElementRef,private r2:Renderer2){}

    @HostListener('document:scroll') onScroll(){
        let { top }=this.elRef.nativeElement.getBoundingClientRect();
        top+=100;
        if(top>0 && top < (window.innerHeight-this.offset)){
            if(this.animationName){
                if(window.innerWidth>=this.threshhold){
                    this.timeout=setTimeout(()=>{
                        this.r2.addClass(this.elRef.nativeElement,this.animationName);
                    },this.delay);
                }
                else{
                    this.r2.addClass(this.elRef.nativeElement,this.animationName);
                }
            }
        }
    }

    ngOnDestroy(){
        clearTimeout(this.timeout);
    }
}