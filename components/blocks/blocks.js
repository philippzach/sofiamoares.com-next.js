import FullImage from './fullimage';
import FullVideo from './fullvideo';
import SquareVideo from './squarevideo';
import BigText from './bigtext';
import withFlip from './flip';
import offCenter from './offcenter';
import DifferentSize from './differentsize';
import DifferentSize3img from './differentsize3img';
import DifferentSize3imgfixed from './differentsize3imgfixed';
import SquareImage from './squareimage';
import SquareText from './squaretext';
import ImageImage from './imageimage';
import VideoVideo from './videovideo';

const Blocks = ({ block }) => {
  // Determine the type of block and render the corresponding component
  //console.log(block.flip);
  const renderBlock = (block) => {
    switch (block.__typename) {
      case 'ImageBlockRecord':
        return <FullImage image={block.image} />;
      case 'Image2xlongRecord':
        return <FullImage image={block.image} />;
      // ... handle other specific block types
      case 'VideoblockRecord':
        return <FullVideo video={block.singlevideo.video} />;
      case 'BigtextblockRecord':
        return <BigText textBlock={block} />;
      /* case 'ImagetextblockRecord':
        const FlippedImageText = withFlip(SquareImage, SquareText, block.flip);
        return <FlippedImageText {...block} />; */
      case 'ImageimageblockRecord':
        return <ImageImage {...block} />;
      case 'ImagevideoblockRecord':
        const FlippedImageVideo = withFlip(
          SquareImage,
          SquareVideo,
          block.flip
        );
        return <FlippedImageVideo {...block} />;
      case 'DifferentsizeRecord':
        return <DifferentSize {...block} />;
      case 'Differentsize3imgRecord':
        return <DifferentSize3img {...block} />;
      case 'Differentsize3imgfixedRecord':
        return <DifferentSize3imgfixed {...block} />;
      case 'ImageoffcenterRecord':
        const OffcenteredMedia = offCenter(FullImage);
        return <OffcenteredMedia {...block} />;
      case 'VideooffcenterRecord':
        const OffcenteredVideo = offCenter(FullVideo);
        return <OffcenteredVideo {...block.video} />;
      case 'HalfvideovideoRecord':
        return <VideoVideo {...block} />;
      default:
        return null;
    }
  };

  return <section className=' '>{renderBlock(block)}</section>;
};

export default Blocks;
