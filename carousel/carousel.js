class Carousel{
    constructor(carId,images){
        this.images=images;
        this.currentIndex=0;
        this.totalItems=this.images.length;
        this.mainCarousel=document.getElementById(carId);
      
       
      
        
    }

    createCarousel(){
        const container=document.createElement('div');
        container.classList.add('carousel-container');
        this.mainCarousel.appendChild(container);

        this.images.forEach((imageSrc)=>{
            const carouselItem=document.createElement('div');
            carouselItem.classList.add("carousel__item");
            const imageEle=document.createElement('img');
            imageEle.src=imageSrc;
            // container.appendChild(imageEle);

            carouselItem.appendChild(imageEle);
            container.appendChild(carouselItem);
        });
       
        // previous button
        const prevButton=document.createElement("button");
        
        prevButton.classList.add("carousel__prev");
        prevButton.addEventListener("click", ()=>this.prevItem());
        const btnImgLeft=document.createElement("img");
        btnImgLeft.src="./assets/left.svg";
        prevButton.appendChild(btnImgLeft);
        this.mainCarousel.appendChild(prevButton);

        // next button
        const nextButton=document.createElement("button");
        
        nextButton.classList.add("carousel__next");
        nextButton.addEventListener("click", ()=>this.nextItem());
        const btnImgRight=document.createElement("img");
        btnImgRight.src="./assets/right.svg";
        nextButton.appendChild(btnImgRight);
        this.mainCarousel.appendChild(nextButton);
       

        // carousel Functionality
        // const slideItems=document.querySelectorAll(".carousel__item");
        // slideItems.forEach((element,index)=>{
        //     element.style.transform=`translateX(${index*100}%)`;
        // });

        // console.log(slideItems)

        // this.showItem();


        // dots
        const dotsWrapper = document.createElement("ul");
		dotsWrapper.classList.add ("dots-container");
        this.mainCarousel.appendChild(dotsWrapper);

        for(let i=0;i<this.totalItems;i++){

            const eachDots=document.createElement("li");
            eachDots.classList.add("carousel__dots");

            dotsWrapper.appendChild(eachDots);
        }


        const dots=this.mainCarousel.querySelectorAll(".carousel__dots");
        dots.forEach((item,index)=>{

            dots[this.currentIndex].style.opacity="85%";

            item.addEventListener('click',()=>this.showItem(index));
        })
        
       

    }

    

    showItem(index){

       
        const dots=this.mainCarousel.querySelectorAll(".carousel__dots");

        const carousel= this.mainCarousel.querySelector(".carousel-container");
       
           
       carousel.style.transform=`translateX(-${index * 100}%)`;
        this.currentIndex=index;


        dots.forEach((item,inx)=>{
            if(inx===this.currentIndex){
                item.style.opacity="85%";
            }
            else{
                item.style.opacity="50%";
            }
        })
 
        
    }

    


      nextItem(){
       

        // this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        // this.showItem();

        this.currentIndex++;
        if(this.currentIndex >= this.totalItems){
            this.currentIndex=0;
        }
      
        this.showItem(this.currentIndex);
    }
    
     prevItem(){
       

    //     this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    // this.showItem();
        
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex= this.totalItems -1;
        }
    
        this.showItem(this.currentIndex);
    }
}

const imgSrc = [
	"./assets/slide1.jpg",
	"./assets/slide2.jpg",
	"./assets/slide3.jpg",
	"./assets/slide4.jpg",
];


const carouselOne=new Carousel("carousel-first",imgSrc);
carouselOne.createCarousel();


const carouselTwo=new Carousel("carousel-second",imgSrc);
carouselTwo.createCarousel();


