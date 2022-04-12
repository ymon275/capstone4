import { useEffect, useState } from "react";
import { Card, Button, Container, Alert } from "react-bootstrap";

function Items() {
  const [items, setItems] = useState<Inventory[]>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const addToCart = () => {
    
  };

  interface Inventory {
    id: number;
    title: string;
    name: string;
    image: string;
    tags: string[];
    description: string;
  }
  const getInventory = () => {
    fetch("http://localhost:5050/inventory")
      .then((result) => result.json())
      .then((result) => setItems(result))
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    setError(undefined);
    setLoading(true);
    try {
      getInventory();
    } catch {
      setError(new Error("Items unavailable"));
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="frontPage">
      <h1>Welcome</h1>
      <Container fluid>
        {error && <Alert variant="danger">{error}</Alert>}
        {items?.map((item, index) => {
          return (
            <Card
              key={index}
              className="d-inline-flex m-1"
              style={{ width: "18rem" }}
            >
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button disabled={loading} variant="primary" onClick={(event) => {

                }}>
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}

export default Items;
