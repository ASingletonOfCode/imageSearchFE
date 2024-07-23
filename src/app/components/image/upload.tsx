import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Typography,
  Option,
  Box,
  AspectRatio,
} from "@mui/joy";
import { useState } from "react";

const UploadImageDialog: React.FC = () => {
  const [upload, setUpload] = useState({});
  const [url, setUrl] = useState("");
  const [sourceSelect, setSourceSelect] = useState<string | null>("file");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSourceSelect = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setSourceSelect(newValue);
    setImagePreview(null); // Reset image preview
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(event.target.value);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "80vh",
        height: "70vh",
        boxShadow: "lg",
      }}
    >
      <CardContent>
        <Typography level="h1">Upload Image</Typography>

        <Box mt={1}>
          <AspectRatio>
            {imagePreview && <img src={imagePreview} alt="Selected Image" />}
          </AspectRatio>
        </Box>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography level="h4">Select an image to upload</Typography>
          <Checkbox label="Detect Objects?" />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FormControl
              sx={{
                padding: "0 1rem 0 0 ",
              }}
            >
              <FormLabel sx={{ display: "flex", flexDirection: "column" }}>
                Image Label:
              </FormLabel>
              <Input type="text" placeholder="Enter a label for your image" />
              <FormHelperText>Give it a good name to refer to</FormHelperText>
            </FormControl>
            <FormControl
              sx={{
                padding: "0 1rem 0 0 ",
              }}
            >
              <FormLabel>Choose a source type:</FormLabel>
              <Select defaultValue="file" onChange={handleSourceSelect}>
                <Option value="file">File</Option>
                <Option value="url">URL</Option>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                padding: "0 1rem 0 0 ",
              }}
            >
              <FormLabel>Image:</FormLabel>
              {sourceSelect == "file" ? (
                <Input type="file" onChange={handleFileChange} />
              ) : (
                <Input
                  type="text"
                  placeholder="URL"
                  onChange={handleUrlChange}
                />
              )}
            </FormControl>
          </Box>
          <Button size="sm">Upload</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default UploadImageDialog;
