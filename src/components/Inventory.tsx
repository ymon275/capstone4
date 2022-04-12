import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import Compressor from "compressorjs";
import _ from "lodash";

function Inventory() {
  const [id, setId] = useState<number>();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imgFile, setImageFile] = useState<File>();
  const [compressedImage, setCompressed] = useState<File | Blob>();
  const [dataURL, setDataURL] = useState<string>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    if (dataURL) {
      try {
        setError(undefined);
        setLoading(true);

        console.log(
          compressedImage?.size! + " bytes new",
          imgFile?.size! + " bytes original",
          (100 * (imgFile?.size! - compressedImage?.size!)) / imgFile?.size! +
            "% smaller!"
        );
        const params = {
          image: dataURL,
          name: imgFile!.name,
          id: id,
          title: title,
          tags: tags,
          description: desc,
        };
        console.log(params);
        await fetch("http://localhost:5050/inventory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }).then((result) => console.log(result));
      } catch (err) {
        setError(err as Error);
      }
    } else {
      setError(new Error("Image is not yet compressed"));
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5 w-100">
      <Card>
        <Card.Body>
          <h2 className="text-center">Add To Inventory</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit as any}>
            <Form.Group>
              <Form.Label>Id</Form.Label>
              <Form.Control
                name="id"
                type="text"
                required
                onChange={(event) => {
                  setId(parseInt(event.target.value));
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                required
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="shirtImage"
                type="file"
                accept="image/*"
                required
                onChange={(event) => {
                  let file = (event.target as HTMLInputElement).files![0];
                  setImageFile(file);
                  console.log(file);
                  const comp = new Compressor(file, {
                    quality: 0.8,
                    success: (newImage) => {
                      setCompressed(newImage);
                      const reader = new FileReader();
                      reader.readAsDataURL(newImage);
                      reader.onloadend = () => {
                        const base64String = reader.result;
                        console.log("Base64 String - ", base64String);
                        setDataURL(base64String as string);
                      };
                    },
                    error: (err) => {
                      setError(err);
                      setCompressed(imgFile);
                    },
                  });
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags (input should be 1, 2, 3, etc.)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                required
                onChange={(event) => {
                  const tags = _.split(event.target.value, ", ");
                  setTags(tags);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                name="description"
                required
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="mt-2 w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Inventory;
