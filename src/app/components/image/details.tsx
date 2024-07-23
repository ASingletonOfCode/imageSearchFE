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
  Stack,
  Grid,
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
        paddingBottom: ".5rem",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "80vh",
          height: "70vh",
          boxShadow: "lg",
          maxHeight: "100vh",
          padding: ".5rem",
        }}
      >
        <Stack>
          <Typography level="h4" margin={".5rem"}>
            {currentImage.label}
          </Typography>
          <CardOverflow
            sx={{
              margin: ".5rem",
            }}
          >
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
              // padding: ".2rem",
              // margin: ".2rem",
            }}
          >
            <List
              orientation="horizontal"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                flexGrow: 100,
              }}
            >
              {currentImage?.detectedObjects ? (
                currentImage?.detectedObjects?.length ?? 0 > 10 ? (
                  currentImage?.detectedObjects
                    ?.slice(0, 10)
                    .map((object, key) => (
                      <ListItem key={key}>
                        <Chip color="primary">{object}</Chip>
                      </ListItem>
                    ))
                ) : (
                  (currentImage?.detectedObjects ?? []).map((object, key) => (
                    <ListItem key={key}>
                      <Chip color="primary">{object}</Chip>
                    </ListItem>
                  ))
                )
              ) : (
                <Typography variant="soft">No detected objects</Typography>
              )}
              {/* <Typography>Show more...</Typography> */}
            </List>
          </CardContent>
        </Stack>
      </Card>
    </Box>
  );
};

export default ImageItem;
