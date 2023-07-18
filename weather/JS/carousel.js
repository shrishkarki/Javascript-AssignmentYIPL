const leftBtn=document.querySelector(".fa-circle-left");
const rightBtn=document.querySelector(".fa-circle-right");
const hourly=document.querySelector(".hourly__forecast");




let currentItem=0;


// const items=document.querySelectorAll(".each__hour");

// console.log(items);

// const eachItemWidth=items[0].offsetWidth;

// const slideItems=(itemSize,items)=>{
//     console.log(hourly.scrollWidth,hourly.clientWidth,hourly.scrollLeft,itemSize);
   
// let isOverflowing =  hourly.clientWidth < hourly.scrollWidth ;
// console.log(isOverflowing);


    // items.forEach((eachHour,index)=>{
    //      eachHour.style.transform = `translateX(-${itemSize*count}px)`;
    // })
    
// items[0].style.transform = `translateX(-${itemSize}px)`;

// }


rightBtn.addEventListener("click",()=>{
    const items=document.querySelectorAll(".each__hour");
    const eachItemSize=items[0].offsetWidth;

    var visibleItems = Math.ceil(hourly.clientWidth / eachItemSize);

    if (currentItem < items.length - visibleItems) {
        currentItem++;
        items.forEach((eachHour)=>{
            eachHour.style.transform = `translateX(-${eachItemSize*currentItem}px)`;
       })
      }
});

leftBtn.addEventListener("click",()=>{
    const items=document.querySelectorAll(".each__hour");
    
    
    const eachItemSize=items[0].offsetWidth;
    
    if(currentItem>0){
        currentItem--;
         items.forEach((eachHour)=>{
         eachHour.style.transform = `translateX(-${eachItemSize*currentItem}px)`;
    })
        
    }
   
    // slideItems(eachItemSize,items);
})



