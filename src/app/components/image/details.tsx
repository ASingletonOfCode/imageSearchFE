import { fetchImage, ImageObject } from "@/app/requests/image";
import {
  Card,
  CardOverflow,
  AspectRatio,
  CardContent,
  Chip,
  Box,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import React, { useState, useEffect } from "react";

interface ImageItemProps {
  currentImage: ImageObject;
}

const ImageItem: React.FC<ImageItemProps> = ({ currentImage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: ".5rem",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "80vh",
          height: "70vh",
          boxShadow: "lg",
        }}
      >
        <CardOverflow>
          <AspectRatio ratio="4/3">
            <img
              src={currentImage?.url}
              loading="lazy"
              alt={currentImage?.label}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            maxHeight: "20vh",
          }}
        >
          <List
            orientation="horizontal"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {currentImage?.detectedObjects?.length ?? 0 > 10
              ? currentImage?.detectedObjects
                  ?.slice(0, 10)
                  .map((object, key) => (
                    <ListItem key={key}>
                      <Chip color="primary">{object}</Chip>
                    </ListItem>
                  ))
              : (currentImage?.detectedObjects ?? []).map((object, key) => (
                  <ListItem key={key}>
                    <Chip color="primary">{object}</Chip>
                  </ListItem>
                ))}
            {/* <Typography>Show more...</Typography> */}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageItem;