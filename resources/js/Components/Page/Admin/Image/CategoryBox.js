import React from 'react';
import { Collapse, ListItem, ListItemText, Divider } from '@material-ui/core';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const CategoryBox = ({ category, images }) => {

  const [open, setOpen] = React.useState(false);
  const [boxImages, setBoxImages] = React.useState([]);

  React.useEffect(() => {
    setBoxImages(images.filter(img => img.category_id === category.id));
  }, [images]);

  return (
    <>
      <ListItem
        button
        onClick={() => setOpen(!open)}
      >
        <ListItemText>
          {category.name} ({boxImages.length})
        </ListItemText>
        {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </ListItem>
      <Collapse in={open}>
        <Divider />
        <div className="p-4">
          <div className="flex-grow flex flex-wrap p-4">
            {boxImages.map(image =>
              <div className="bg-gray-100 rounded-sm w-16 h-16 overflow-hidden m-2" key={image.id}>
                <img
                  className="w-full h-full object-contain"
                  src={`/storage/${image.src}`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </Collapse>
      <Divider />
    </>
  )
};

export default CategoryBox;