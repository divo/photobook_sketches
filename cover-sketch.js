import { draw_text } from './draw_text.js'

export const cover_sketch = ({width, height, canvas, data}) => {
  return ({ context, width, height, data, canvas }) => {
    let scale;
    let y = 0;
    let x = 0;

    const img = data['img'];
    const logo = data['logo'];
    const name = data['name'];
    const width_offset = data['width_offset'];
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    if (is_landscape(img)) {
      scale = (width - width_offset) / img.width;
    } else {
      scale = height / img.height; // TODO: How to layout landscape covers? Easiest way is to simply not allow it
    }

    const s_height = img.height * scale;

    if (logo) { // Guard becuase logo is not used in rails app
      const logo_scale = scale / 4; // TODO: Needed?
      const logo_x = width_offset / 2 - (logo.width * scale) / 2;
      const logo_y = height - (logo.height * scale) - 20;
      context.drawImage(img, logo_x, logo_y, (logo.width * scale), logo.height * scale);
    }

    context.drawImage(img, x + width_offset, y, (img.width * scale), s_height);

    const fontSize = 6; //TODO: What is going on with the scaling here? What is canvas sketch doing? It's all in mm??
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'bottom';
    draw_text(name, (width_offset / 2) + (width / 2), s_height + (( height - s_height) / 2), "normal", fontSize, context);
 };
};

const is_landscape = (image) => {
  return image.width > image.height;
};
