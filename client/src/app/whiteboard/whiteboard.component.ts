
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { CONTEXT } from '@angular/core/src/render3/interfaces/view';


@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit {
  @ViewChild('canvasDiv') canvasRef: ElementRef;
  
   shape:string;
  paint:boolean; 
  context:any;
  
  curTool:string;
  curColor:string;
  clickColor :any;

  canvasx:number;
  canvasy:number;
  last_mousex:number;
  last_mousey:number;
  mousex :number;
  mousey:number;
  startX:number;
  startY:number;

  clickX:any;
  clickY :any;
  clickDrag :any;
  lineWidth:number;
  canvas:any;

  constructor() { }

  ngOnInit() {
    debugger;   
    this.last_mousex = this.last_mousey = 0;
    this.mousex = this.mousey = this.startX=this.startY=0;
    this.paint = false;
    this.clickX=[];
    this.clickY=[];
    this.clickDrag=[];
    this.clickColor=[];

    this.canvas = document.createElement('canvas');
    
    this.canvasRef.nativeElement.setAttribute('id', 'canvas');
    this.canvasRef.nativeElement.appendChild(this.canvas);

    this.canvasx = this.canvasRef.nativeElement.offsetLeft;
        this.canvasy = this.canvasRef.nativeElement.offsetTop;
    // if(typeof G_vmlCanvasManager != 'undefined') {
      //canvas = G_vmlCanvasManager.initElement(canvas);
    // }
    this.canvas.setAttribute("width", "650");
    this.canvas.setAttribute("height", "400");
    this.canvas.setAttribute('style',"border:2px solid #D3D3D3;");
    this.context= this.canvas.getContext('2d');
    
    //this.context.restore();
    this.shape="pen"; 
  //  this.context.fillStyle = "#000000";
  //  this.context.strokeStyle ="black";
    this.curColor="black";
    this.lineWidth=2;
  //context.fillRect(0,0,150,75);

    }
    mousedown=function(e){
      //sdebugger;
      this.last_mousex =e.clientX-this.canvasx;
    this.last_mousey = e.clientY-this.canvasy;   
      
      this.paint = true;
      
      
      //free hand 
      if(this.shape=='pen'){
        this.addClick(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.redraw();
      }
    }
    mousemove=(function(e){
      
      if(this.paint) {
        debugger;
      this.mousex = e.clientX-this.canvasx;
      this.mousey = e.clientY-this.canvasy;
          //free hand
          if(this.shape=="pen"){
            this.addClick(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, true);
            this.redraw();
          }
      else{
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height); //clear canvas
        this.context.beginPath();
        this.context.strokeStyle = this.curColor;
        this.context.lineWidth = 1;
        //Square
          if(this.shape=='square'){   
            debugger;     
          var width = this.mousex-this.last_mousex;
          var height = this.mousey-this.last_mousey;
          this.context.rect(this.last_mousex,this.last_mousey,width,height);
          //this.context.clearRect(this.last_mousex,this.last_mousey,width,height); 
          }
          
          //Line
          if(this.shape=='line'){
          this.context.moveTo(this.last_mousex,this.last_mousey);
          this.context.lineTo(this.mousex,this.mousey);
          this.context.lineJoin = this.context.lineCap = 'round';    
          }    
          
          //circle
          if(this.shape=='circle'){
            this.drawOval(this.mousex,this.mousey);
          }
          //triangle
          //this.addTriangle(this.mousex, this.mousey);
          
          
          this.context.stroke();
        }
      }

  });
      mouseup=(function(e){
        this.paint = false;
      });
      mouseleave=(function(e){
        this.paint = false;
      });
    addClick=function(x, y, dragging)
    {
      debugger;
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
      this.clickColor.push(this.curColor);
    }
    redraw=function(){
      //this.context.clearRect(0, 0, 450, 300); // Clears the canvas
      
      //this.context.strokeStyle = "#df4b26";
      this.context.lineJoin = "round";
      this.context.lineWidth = this.lineWidth;
          
      for(var i=0; i < this.clickX.length; i++) {		
        this.context.beginPath();
        if(this.clickDrag[i] && i){
          this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
        }else{
          this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
        }
        this.context.lineTo(this.clickX[i], this.clickY[i]);
        this.context.closePath();
        this.context.strokeStyle=this.clickColor[i];
        this.context.stroke();
      }
    }


      drawOval=(function(x,y){
        debugger;
                //this.context.clearRect(0,0,450,300);
                this.context.beginPath();
                //this.context.clearRect(this.last_mousex, this.last_mousey + (y-this.last_mousey)/2,(y-this.last_mousey)/2); 
                this.context.moveTo(this.last_mousex, this.last_mousey + (y-this.last_mousey)/2);
                this.context.bezierCurveTo(this.last_mousex, this.last_mousey, x, this.last_mousey, x, this.last_mousey + (y-this.last_mousey)/2);
                this.context.bezierCurveTo(x, y, this.last_mousex, y, this.last_mousex, this.last_mousey + (y-this.last_mousey)/2);
                //this.context.clearRect(x, y, this.last_mousex, y, this.last_mousex, this.last_mousey + (y-this.last_mousey)/2); 
                this.context.closePath();
                this.context.stroke();
            });
        //triangle
    // addTriangle=function(x, y) {
    //                         const triangle = new createjs.Shape(); // define triangle in the scope it is used
    //                         //triangle.graphics.beginFill("#000");
    //                         triangle.graphics       // break the line to make it more readable and easier to modify
    //                             .moveTo(x, y)       // use spaces after commas
    //                             .lineTo(x - 50, y) // and spaces around operators
    //                             .lineTo(x - 20, y - 50)
    //                             .lineTo(x, y);
    //                         stage.addChild(triangle);
    //                         stage.update();
    //                     }
    pen=function(e){
      this.shape="pen";
      this.lineWidth=2;
      //this.context.clearRect(0, 0, 450, 300);
      this.clickX=[];
        this.clickY=[];
        this.clickDrag=[];
    }  
    erase=function(){  
      this.curColor="white";
      this.lineWidth=2;
    }
    clear=function(){
      this.clickX=[];
        this.clickY=[];
        this.clickDrag=[]
      this.context.clearRect(0, 0, 650, 400);
    }
    save=function(){
      this.context.save();
    }
    color=function(color){
      debugger;
      this.curTool = "crayon";
      this.curColor="#cb3594";
    }
    line=function(e){
      this.curColor="black";
      this.shape="line";
    }
    circle=function(e){
      this.curColor="black";
      this.shape="circle";  
    }
    square=function(e){
      debugger;
      this.curColor="black";
      this.shape="square";
    }
    }
