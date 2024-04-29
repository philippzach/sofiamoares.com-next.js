import FullImage from './fullimage';
import FullVideo from './fullvideo';
import SquareVideo from './squarevideo';
import BigText from './bigtext';
import withFlip from './flip';
import SquareImage from './squareimage';
import SquareText from './squaretext';
import ImageImage from './imageimage';

const Blocks = ({ block }) => {
  // Determine the type of block and render the corresponding component
  //console.log(block.flip);
  const renderBlock = (block) => {
    switch (block.__typename) {
      case 'ImageBlockRecord':
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
      default:
        return null;
    }
  };

  return <section className='flex flex-wrap'>{renderBlock(block)}</section>;
};

export default Blocks;
