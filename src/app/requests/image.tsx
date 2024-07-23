const AUTH_USERNAME = "david";
const AUTH_PASSWORD = "password";

export interface ImageObject {
  id: number;
  label: string;
  url: string;
  //   dateCreated: string;
  detectedObjects: string[];
  uploadedBy: string;
  blacklisted: boolean;
}

export const fetchImage = (id: number) => {
  const result = fetch(`http://localhost:8000/images/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`)}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const result = {
        id: data.id,
        label: data.label,
        url: data.source_url || data.source,
        // dateCreated: data.date_created,
        detectedObjects: data.detected_objects,
        uploadedBy: data.uploaded_by,
        blacklisted: !!data.blacklisted,
      } as ImageObject;
      return result;
    })
    .catch((error) => console.error);

  return result;
};

export const fetchImages = (filters: string[] = []) => {
  const result = fetch("http://localhost:8000/images/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`)}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const result = data.map((image: any) => {
        return {
          label: image.label,
          url: image.source_url || image.source,
          detectedObjects: image.detected_objects,
          uploadedBy: image.uploaded_by,
          blacklisted: !!image.blacklisted,
        } as ImageObject;
      });
      return result;
    })
    .catch((error) => console.error);

  return result;
};

export const uploadImage = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/images/", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`)}`,
      "content-type": "multipart/form-data",
    },
    body: formData,
  })
  try {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${data}`);
      
      }
    }
    catch(error) {
      console.error;
    }

  return response;
};
