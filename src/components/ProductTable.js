import React from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

class ProductTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            status: true
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.notSubmit = this.notSubmit.bind(this)

    }

    load(url) {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    onSubmitHandler(event) {
        this.setState({
            isLoaded: false,
        });
        event.preventDefault()
        this.setState({
            status: false,
        });
        const url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + this.newBrand.value.trim().toLowerCase() + "&product_type=" + this.newProduct.value
        console.log(url)
        this.load(url)
    }

    notSubmit(event) {
        event.preventDefault()
    }

    render() {
        const { status, isLoaded, items } = this.state;
        if (status) {
            return <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="search" className="form-label">Search Brads</label>
                        <Container>
                            <Row>
                                <Col>
                                    <input ref={(c) => this.newBrand = c} type="text" className="form-control col" id="search" placeholder="Search..." />
                                </Col>
                                <Col>
                                    <select ref={(j) => this.newProduct = j} className="form-select col" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="blush">Blush</option>
                                        <option value="bronzer">Bronzer</option>
                                        <option value="eyebrow">Eyebrow</option>
                                        <option value="eyeliner">Eyeliner</option>
                                        <option value="eyeshadow">Eyeshadow</option>
                                        <option value="foundation">Foundation</option>
                                        <option value="lip liner">Lip liner</option>
                                        <option value="lipstick">Lipstick</option>
                                        <option value="mascara">Mascara</option>
                                        <option value="nail polish">Nail polish</option>
                                    </select>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <button onClick={this.onSubmitHandler} type="submit" className="btn btn-primary">Search</button>

                </form>
            </div>;
        } else if (!isLoaded) {

            return (
                <>
                    <div>Loading...</div>
                </>
            );
        } else {
            if (items.length === 0) {
                return (
                    <>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="search" className="form-label">Search Brads</label>
                                <Container>
                                    <Row>
                                        <Col>
                                            <input ref={(c) => this.newBrand = c} type="text" className="form-control" id="search" placeholder="Search..." />
                                        </Col>
                                        <Col>
                                            <select ref={(j) => this.newProduct = j} className="form-select col" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="blush">Blush</option>
                                                <option value="bronzer">Bronzer</option>
                                                <option value="eyebrow">Eyebrow</option>
                                                <option value="eyeliner">Eyeliner</option>
                                                <option value="eyeshadow">Eyeshadow</option>
                                                <option value="foundation">Foundation</option>
                                                <option value="lip liner">Lip liner</option>
                                                <option value="lipstick">Lipstick</option>
                                                <option value="mascara">Mascara</option>
                                                <option value="nail polish">Nail polish</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <button onClick={this.onSubmitHandler} type="submit" className="btn btn-primary">Search</button>
                        </form>
                        <br></br>
                        <center>
                            <h1>Not Found</h1>
                            <Image src="https://media1.tenor.com/images/173a12d6975d4fac4f79702157086485/tenor.gif?itemid=8326897" />
                        </center>
                    </>
                )
            } else {
                return (
                    <>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="search" className="form-label">Search Brads</label>
                                <Container>
                                    <Row>
                                        <Col>
                                            <input ref={(c) => this.newBrand = c} type="text" className="form-control" id="search" placeholder="Search..." />
                                        </Col>
                                        <Col>
                                            <select ref={(j) => this.newProduct = j} className="form-select col" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="blush">Blush</option>
                                                <option value="bronzer">Bronzer</option>
                                                <option value="eyebrow">Eyebrow</option>
                                                <option value="eyeliner">Eyeliner</option>
                                                <option value="eyeshadow">Eyeshadow</option>
                                                <option value="foundation">Foundation</option>
                                                <option value="lip liner">Lip liner</option>
                                                <option value="lipstick">Lipstick</option>
                                                <option value="mascara">Mascara</option>
                                                <option value="nail polish">Nail polish</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <button onClick={this.onSubmitHandler} type="submit" className="btn btn-primary">Search</button>
                        </form>
                        <br></br>

                        <Container>
                            <Row>
                                {
                                    items.map(
                                        i =>
                                            <Col>
                                                <Card className="marginTop" style={{ width: '18rem' }}>
                                                    <Card.Img style={{ height: 286 }} variant="top" src={i.image_link} onError={(e) => { e.target.onerror = null; e.target.src = "https://as2.ftcdn.net/jpg/02/33/80/31/500_F_233803177_TvWCtjIMZCzmnOzqw9R43Fw5YO6JXF8q.jpg" }} />
                                                    <Card.Body>
                                                        <Card.Title>{i.brand}</Card.Title>
                                                        <Card.Text>
                                                            <p>{i.name}</p>
                                                            <p>$ {i.price}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                    )
                                }
                            </Row>
                        </Container>
                    </>

                )
            }
        }
    }

}

export default ProductTable