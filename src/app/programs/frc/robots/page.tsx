import { Image } from "@/components/Image";
import viperLogo from "@/image/biohazard/viper-logo.webp";
import troubleClef from "@/image/biohazard/trouble-logo.webp";
import { ParallaxImage } from "../components";
import { PatternBackground } from "@/components/PatternBackground";
import { Carousel } from "@/components/Carousel";
import { ManualCarousel } from "@/components/ManualCarousel";
import { CarouselNext, CarouselPrevious } from "@/components/shadcn/ui/carousel";

function SlideButtons() {
  return (
    <>
      <CarouselPrevious className={"w-20 h-24 opacity-85"} variant={"default"} size={"lg"}>
        
      </CarouselPrevious>
      <CarouselNext className={"w-20 h-24 opacity-85"} variant={"default"} size={"lg"}>
    
      </CarouselNext>
    </>
  )
}

const slides = [(
  <>
    <ParallaxImage background="/image/biohazard/2019-robot-field.webp">
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1 className="px-14 pb-4 text-2xl heading-2">Toxic Silver</h1>
          <p>
            With its shining aluminum lift and maneuverable mecanum drivetrain, Toxic Silver won us an Excellence in Engineering Award at the Greater Pittsburgh Regional
            and Rank 8 at the Battle O&apos; Baltimore.
          </p>
        </div>
      </PatternBackground>
    </div>
  </>
),(
  <>
    <ParallaxImage background="/image/biohazard/2021-robot-field.webp">
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1 className="px-14 pb-4 text-2xl heading-2">Robo Fett</h1>
          <p>
            Armed with a giant scissor-lift climber and an inline shooting mechanism, Robo Fett is one of two Biohazard robots to use pneumatic wheels.
            Along one side, a large plexiglass panel protects the electronics while proudly displaying the 2020 team logo.
          </p>
        </div>
      </PatternBackground>
    </div>
  </>
),(
  <>
    <ParallaxImage background="/image/biohazard/2022-robot-field-3.webp">
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
      <div className="py-12 px-6">
          <h1 className="px-14 pb-4 text-2xl heading-2">O&apos;Mega</h1>
          <p>
            One of our heavier robots, O&apos;Mega boasts a giant cannon, a sizeable intake, and two climbing arms. 
            An adjustable firing mechanism allowed it to shoot into both hoops in the 2022 game, and won us a spot in the finals and an Industrial Design Award.
          </p>
        </div>
      </PatternBackground>
    </div>  
  </>
),(
  <>
    <ParallaxImage background="/image/biohazard/2023-robot-field.webp">
      <Image src={viperLogo} alt="Viper logo" className="relative m-auto inset-y-1/2 w-[200px]">
      </Image>
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1 className="px-14 pb-4 text-2xl heading-2">Viper</h1>
          <p>
            Competing in the 2023 Pittsburgh Regional Competition, Viper won us the Industrial Design Award, and a few curious looks from fellow teams.
            Its main features are the three foot metal arm and 3d printed pneumatic claw, used to atriculate inflatable cubes.
            Mecanum wheels allow it to fine-tune its position, and dual cameras gave our drivers lots of visibilty.
          </p>
        </div>
      </PatternBackground>
    </div>
  </>
),(
  <>
    <ParallaxImage background="/image/biohazard/2024-robot-field.webp">
      <Image src={troubleClef} alt="TroubleClef logo" className="relative m-auto inset-y-1/2 w-[400px]">
      </Image>
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1 className="px-14 pb-4 text-2xl heading-2">TroubleClef</h1>
          <p>
            Amid more conventional and exposed designs, TroubleClef sticks out like a sore thumb with its sleek gunmetal sides and concealed electronics.
            A 3d printed chain carries game pieces from the ground up to the peak of the ramp, and a pair of motors shoot it forward.
            Coming back from a loss in Pittsburgh, this machine got us 15th place at the Buckeye Valley Regional and helped us win our Imagery Award in the 2023-2024 season.
          </p>
        </div>
      </PatternBackground>
    </div>
  </>
),(
  <>
    <ParallaxImage>
      <SlideButtons></SlideButtons>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1 className="px-14 pb-4 text-2xl heading-2">Coming soon...</h1>
          <p>
          </p>
        </div>
      </PatternBackground>
    </div>
  </>
)]

//Get images from previous years
export default function Robots() {
  return (
    <>
      <ManualCarousel slides={slides} noLoop={true} autoHeight={true} startIndex={slides.length - 2}>
      </ManualCarousel>
    </>
  );
}