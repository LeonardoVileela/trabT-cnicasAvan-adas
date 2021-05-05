import React from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import loading from '../assets/Bean Eater-1s-450px.gif'
class ProductTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            status: true,
            brandName: false,
            productName: false,
            compar: ""
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.notSubmit = this.notSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);

    }



    load(url) {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.state.productName) {
                        let resulted = {}
                        result.map(
                            i =>
                                this.state.compar === i.name.toLowerCase() ?
                                    resulted = i : i
                        )

                        this.setState({
                            isLoaded: true,
                            items: Object.keys(resulted).length === 0 ? [] : [resulted],
                            brandName: false,
                            productName: false,

                        })

                    } else {
                        this.setState({
                            isLoaded: true,
                            items: result,
                            brandName: false,
                            productName: false,
                        })
                    }

                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
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
        let url = ""
        if (this.newProduct.value !== "null") {
            url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + this.newBrand.value.trim().toLowerCase() + "&product_type=" + this.newProduct.value
        } else if (this.state.brandName) {
            url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + this.newBrand.value.trim().toLowerCase()
        } else if (this.state.productName) {
            console.log("entrou")
            url = "http://makeup-api.herokuapp.com/api/v1/products.json"

            this.setState({
                compar: this.newBrand.value.trim().toLowerCase()
            })
        }
        this.load(url)
    }

    notSubmit(event) {
        event.preventDefault()
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === "productName") {
            this.setState({
                productName: value,
                brandName: false
            });
        } else {
            this.setState({
                productName: false,
                brandName: value
            });
        }
    }

    render() {
        const { status, isLoaded, items } = this.state;
        if (status) {
            return <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="search" className="form-label">Search</label>
                        <Container>
                            <Row>
                                <Col>
                                    <input ref={(c) => this.newBrand = c} type="text"
                                        className="form-control" id="search" placeholder="Search..." />
                                </Col>
                                <Col>
                                    <select ref={(j) => this.newProduct = j} className="form-select col"
                                        aria-label="Default select example">
                                        <option selected value="null">Open this select menu</option>
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


                            <div style={{ marginTop: 5 }}>
                                <label style={{ marginRight: 10 }} htmlFor="brandName" className="form-label">Brand Name</label>
                                <input id="brandName"
                                    name="brandName"
                                    type="checkbox"
                                    checked={this.state.brandName}
                                    onChange={this.handleInputChange} />

                            </div>
                            <div>

                                <label style={{ marginRight: 10 }} htmlFor="productName" className="form-label">Product Name</label>
                                <input id="productName"
                                    name="productName"
                                    type="checkbox"
                                    checked={this.state.productName}
                                    onChange={this.handleInputChange} />
                            </div>


                        </Container>
                    </div>

                    <button onClick={this.onSubmitHandler} type="submit" className="btn btn-primary">Search</button>

                </form>
            </div>;
        } else if (!isLoaded) {

            return (
                <>
                    <div>
                        <center>
                            <h1>Loading...</h1>
                            <Image src={loading}></Image>
                        </center>
                    </div>
                </>
            );
        } else {
            if (items.length === 0) {
                return (
                    <>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="search" className="form-label">Search</label>
                                <Container>
                                    <Row>
                                        <Col>
                                            <input ref={(c) => this.newBrand = c} type="text"
                                                className="form-control" id="search" placeholder="Search..." />
                                        </Col>
                                        <Col>
                                            <select ref={(j) => this.newProduct = j} className="form-select col"
                                                aria-label="Default select example">
                                                <option selected value="null">Open this select menu</option>
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


                                    <div style={{ marginTop: 5 }}>
                                        <label style={{ marginRight: 10 }} htmlFor="brandName" className="form-label">Brand Name</label>
                                        <input id="brandName"
                                            name="brandName"
                                            type="checkbox"
                                            checked={this.state.brandName}
                                            onChange={this.handleInputChange} />

                                    </div>
                                    <div>

                                        <label style={{ marginRight: 10 }} htmlFor="productName" className="form-label">Product Name</label>
                                        <input id="productName"
                                            name="productName"
                                            type="checkbox"
                                            checked={this.state.productName}
                                            onChange={this.handleInputChange} />
                                    </div>


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
                                <label htmlFor="search" className="form-label">Search</label>
                                <Container>
                                    <Row>
                                        <Col>
                                            <input ref={(c) => this.newBrand = c} type="text"
                                                className="form-control" id="search" placeholder="Search..." />
                                        </Col>
                                        <Col>
                                            <select ref={(j) => this.newProduct = j}
                                                className="form-select col" aria-label="Default select example">
                                                <option selected value="null">Open this select menu</option>
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

                                    <div style={{ marginTop: 5 }}>
                                        <label style={{ marginRight: 10 }} htmlFor="brandName" className="form-label">Brand Name</label>
                                        <input id="brandName"
                                            name="brandName"
                                            type="checkbox"
                                            checked={this.state.brandName}
                                            onChange={this.handleInputChange} />

                                    </div>
                                    <div>

                                        <label style={{ marginRight: 10 }} htmlFor="productName" className="form-label">Product Name</label>
                                        <input id="productName"
                                            name="productName"
                                            type="checkbox"
                                            checked={this.state.productName}
                                            onChange={this.handleInputChange} />
                                    </div>


                                </Container>

                            </div>
                            <button onClick={this.onSubmitHandler} type="submit"
                                className="btn btn-primary">Search</button>
                        </form>
                        <br></br>

                        <Container>
                            <Row>
                                {
                                    items.map(
                                        i =>
                                            <Col>
                                                <Card className="marginTop" style={{ width: '18rem' }}>
                                                    <Card.Img style={{ height: 286 }} variant="top" src={i.image_link} onError={(e) => { e.target.onerror = null; e.target.src = "https://t4.ftcdn.net/jpg/02/33/80/31/360_F_233803177_TvWCtjIMZCzmnOzqw9R43Fw5YO6JXF8q.jpg" }} />
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