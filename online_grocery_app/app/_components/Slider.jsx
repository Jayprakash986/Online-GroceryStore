import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image  from 'next/image'

function Slider({sliderList}) {
  // console.log('Slider Data:', sliderList); // Debug log
  return (
   <Carousel className="w-full max-w-7xl mx-auto px-4">
  <CarouselContent>
    {sliderList?.map((slider,i) => {
        // console.log('Individual Slider:', slider); // Debug log
        return (
          <CarouselItem key={i}>
            <Image 
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${slider?.image?.[0]?.url}`} 
              alt={slider?.name || "slider image"} 
              width={1200}  
              height={300}
              priority={i === 0} // Add priority to first image
              className="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
              quality={90}
            />
          </CarouselItem>
        );
    })}
    
   
    
  </CarouselContent>
  <CarouselPrevious className="left-2" />
  <CarouselNext className="right-2" />
</Carousel>
  )
}

export default Slider