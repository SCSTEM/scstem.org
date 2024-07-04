import { Image } from "@/components/Image";
import viperLogo from "@/image/biohazard/viper-logo.webp";
import troubleClef from "@/image/biohazard/trouble-logo.webp";
import { ParallaxImage } from "../components";
import { PatternBackground } from "@/components/PatternBackground";
import { Carousel } from "@/components/Carousel";

const slides = [(
  <>
    <ParallaxImage background="/image/biohazard/2021-robot-field.webp">
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1>Idk the name</h1>
          <p>
          </p>
        </div>
      </PatternBackground>
    </div>
  </>
),(
  <>
    <ParallaxImage background="/image/biohazard/2022-robot-field-3.webp">
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
      <div className="py-12 px-6">
          <h1>Omega</h1>
          <p>
          </p>
        </div>
      </PatternBackground>
    </div>  
  </>
),(
  <>
    <ParallaxImage background="/image/biohazard/2023-robot-field.webp">
      <Image src={viperLogo} alt="Viper at the 2023 Greater Pittsburgh Regional" className="relative m-auto inset-y-1/2 w-[200px]">
      </Image>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1>Viper</h1>
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
      <Image src={troubleClef} alt="TroubleClef at the 2024 Greater Pittsburgh Regional" className="relative m-auto inset-y-1/2 w-[400px]">
      </Image>
    </ParallaxImage>
    <div className="border-y-8 border-yellow-400">
      <PatternBackground pattern="circuit">
        <div className="py-12 px-6">
          <h1>TroubleClef</h1>
          <p>
            Amid more conventional and exposed designs, TroubleClef sticks out like a sore thumb with its sleek gunmetal sides and concealed electronics.
            A 3d printed chain carries game pieces from the ground up to the peak of the ramp, and a pair of motors shoot it forward.
            Coming back from a loss in Pittsburgh, this machine got us 15th place at the Buckeye Valley Regional and helped us win our Imagery Award.
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
      <Carousel slides={slides} noLoop={true} noAuto={true}>

      </Carousel>
    </>
  );
}