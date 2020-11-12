import { Component,OnInit,OnDestroy,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { animate,query,stagger,style,transition,trigger,group } from "@angular/animations"
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { take } from "rxjs/operators";

interface iexp{
  position:string,
  interval:string,
  organization:string,
  brief:string,
  points:string[],  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('company',[
      transition('*<=>*',[
        style({ opacity:0,'transform':'translateY(15px)' }),
        animate(400,style({ opacity:1,'transform':'translateY(0px)'  }))
      ])
    ]),
    trigger('my-info',[
      transition('void=>*',[
        query('p,h1,a',[
          style({ opacity:0,'transform':'translateY(10px)' }),
        ]),
        query('p,h1,a',stagger(400,[
          animate(300,style({ opacity:1,'transform':'translateY(0px)' }))
        ]))
      ])
    ]),

    trigger('mail',[
      transition('void=>*',[
        query('svg',[
          style({ opacity:0,'transform':'scale(0.5)' }),
          animate(400,style({ opacity:1,'transform':'scale(1)' })),
        ]),
      ])
    ]),

    trigger('social',[
      transition('void=>*',[
        query('a',[
          style({ opacity:0,'transform':'scale(0.5)' }),
        ]),
        query('a',stagger(200,[
          animate(200,style({ opacity:1,'transform':'scale(1)' })),
        ]))
      ])
    ]),

    trigger('name',[
      transition('void=>*',[
        style({ opacity:0,'transform':'scale(0.5)' }),
        animate(400,style({ opacity:1,'transform':'scale(1)' })),
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit,OnDestroy,AfterViewInit{

  @ViewChild('about') about:ElementRef;
  @ViewChild('experience') exp:ElementRef;
  @ViewChild('contact') contact:ElementRef;
  @ViewChild('projects') projects:ElementRef;
  @ViewChild('home') home:ElementRef;

  clickedCompany:string="Ezibyte Technologies Pvt. Ltd.";

  clickedLink:string;
  subs:Subscription;
  isLoaded:boolean=false;
  
  expInfo:iexp[]=[
    { 
    position:'Summer Intern',
    interval:'June 3, 2020 - Aug. 3, 2020',
    organization:'Ezibyte Technologies Pvt. Ltd.',
    brief:'I was a part of backend development team for a flight management project. I was assigned the domain of Role based Authentication.',points:[
      'User Model Design',
      'User Authentication',
      'Testing the REST API',
      'Documentation'
    ] },
    {
      position:"Digital Marketing Intern",
      interval:'Nov. 16, 2018 - Dec. 15, 2018',
      organization:'Mission Fight Back Pvt. Ltd.',
      brief:'I was a digital marketing intern for this organization. I learned a lot about marketing and also promoted events that encouraged women empowerment and safety',
      points:[
        'Digital Marketing',
        'Event Promotion',
        'Women Empowerment and Safety'
      ]
    },
    {
      position:"Digital Marketing Intern",
      interval:'Aug. 21, 2018 - Sept. 21, 2018',
      organization:'Bling Stores Pvt. Ltd.',
      brief:'I was a digital marketing intern for this organization. I learned a lot about marketing and also promoted events that encouraged the sales of the organization',
      points:[
        'Digital Marketing',
        'Product Promotion',
      ]
    },
    {
      position:"Digital Marketing Intern",
      interval:'Nov. 15, 2017 - Dec. 31, 2017',
      organization:'La Polo International Pvt. Ltd.',
      brief:'I was a digital marketing intern for this organization. I learned a lot about POLO sport and also promoted events that encouraged POLO sport in India',
      points:[
        'Digital Marketing',
        'Event Promotion',
      ]
    }
  ];

  title = 'PortfolioApp';
  
  constructor(private aroute:ActivatedRoute,private vps:ViewportScroller){}

  ngOnInit(){
  }

  ngAfterViewInit(){
    this.subs=this.aroute.fragment.pipe(take(2)).subscribe((d:string)=>{
      if(d){
        this.onClick(d,false);
      }
    });
  }

  getDetails(company:string){

    let details=this.expInfo.filter((item)=>item.organization==company);
    details.splice(1);
    return details;

  }

  onTop(event:string){
    this.clickedLink=event;
  }

  onClick(element:string,isSmooth=true){
    this.clickedLink=element;
    let option=isSmooth ? { behavior:'smooth' }:null;
    switch(element){
      case "home":
        return this.home.nativeElement.scrollIntoView(option);
      case "about":
        return this.about.nativeElement.scrollIntoView(option);
      case "experience":
        return this.exp.nativeElement.scrollIntoView(option);
      case "contact":
        return this.contact.nativeElement.scrollIntoView(option);
      case "projects":
        return this.projects.nativeElement.scrollIntoView(option); 
    }
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
