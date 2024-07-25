import { fetchImages, ImageObject, uploadImage } from "@/app/requests/image";
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
import { FormEvent, useState } from "react";

interface UploadImageDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
}

const UploadImageDialog: React.FC<UploadImageDialogProps> = ({
  setOpen,
  setImages,
}) => {
  const [sourceSelect, setSourceSelect] = useState<string | null>("file");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement> | null) => {
    setError(null);
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget as HTMLFormElement);
    formData.append(
      "source_type",
      formData.get("source_type") == "url"
        ? "URL"
        : formData.get("source_type") == "upload"
        ? "UPLOAD"
        : ""
    );
    const result = await uploadImage(formData);

    if (result.ok) {
      setOpen(false);
      fetchImages().then((result) => {
        setImages(result as ImageObject[]);
      });
    } else {
      setError(`Error uploading image!`);
    }
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
        <form onSubmit={(event) => handleSubmit(event)}>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography level="h4">Select an image to upload</Typography>
            <Checkbox label="Detect Objects?" name="detect_objects" />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl
                sx={{
                  padding: "0 1rem 0 0 ",
                }}
              >
                <FormLabel sx={{ display: "flex", flexDirection: "column" }}>
                  Image Label:
                </FormLabel>
                <Input
                  name="label"
                  type="text"
                  placeholder="Enter a label for your image"
                />
                <FormHelperText>Give it a good name to refer to</FormHelperText>
              </FormControl>
              <FormControl
                sx={{
                  padding: "0 1rem 0 0 ",
                }}
              >
                <FormLabel>Choose a source type:</FormLabel>
                <Select
                  name="source_type"
                  defaultValue="upload"
                  onChange={handleSourceSelect}
                >
                  <Option value="upload">File</Option>
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
                  <Input
                    name="source"
                    type="file"
                    onChange={handleFileChange}
                  />
                ) : (
                  <Input
                    name="source_url"
                    type="text"
                    placeholder="URL"
                    onChange={handleUrlChange}
                  />
                )}
              </FormControl>
            </Box>
            <FormControl>
              <Button size="sm" type="submit">
                Upload
              </Button>
              {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadImageDialog;
