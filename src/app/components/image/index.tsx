import { fetchImages, ImageObject } from "@/app/requests/image";
import { Box, Button, DialogTitle, Drawer, ModalClose } from "@mui/joy";
import { useState, useEffect } from "react";
import ImageItem from "./details";
import UploadImageDialog from "./upload";

const Images: React.FC = () => {
  const [images, setImages] = useState<ImageObject[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchImages().then((result) => {
      setImages(result as ImageObject[]);
    });
  }, []);

  return (
    <div className="flex-col">
      <Button
        onClick={() => setOpen(!open)}
        sx={{
          margin: ".5rem",
        }}
        {...(open ? { variant: "outlined" } : { variant: "solid" })}
      >
        {!open ? "Upload" : "Cancel"}
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!open ? (
          images.map((image) => {
            return <ImageItem key={image?.id} currentImage={image} />;
          })
        ) : (
          <UploadImageDialog setOpen={setOpen} />
        )}
      </Box>
    </div>
  );
};

export default Images;
