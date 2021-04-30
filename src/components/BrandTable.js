import React from 'react'
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 500 },
    { field: 'price', headerName: 'Price', width: 130 },
]


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
        const url = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + this.newUrl.value.trim().toLowerCase()
        this.load(url)
    }

    notSubmit(event){
        event.preventDefault()
    }

    render() {
        const { status, isLoaded, items } = this.state;
        if (status) {
            return <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="search" className="form-label">Search Brads</label>
                        <input ref={(c) => this.newUrl = c} type="text" className="form-control" id="search" placeholder="Search..." />
                    </div>
                    <button onClick={this.onSubmitHandler} type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>;
        } else if (!isLoaded) {

            return (
                <>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="search" className="form-label">Search Brads</label>
                            <input ref={(c) => this.newUrl = c} type="text" className="form-control" id="search" placeholder="Search..." />
                        </div>
                        <button onClick={this.notSubmit} type="submit" className="btn btn-primary">Search</button>
                    </form>
                    <br></br>
                    <div>Loading...</div>
                </>
            );
        } else {
            return (
                <>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="search" className="form-label">Search Brads</label>
                            <input ref={(c) => this.newUrl = c} type="text" className="form-control" id="search" placeholder="Search..." />
                        </div>
                        <button onClick={this.onSubmitHandler} type="submit" className="btn btn-primary">Search</button>
                    </form>
                    <br></br>

                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={items} columns={columns} pageSize={5} />
                    </div>
                </>

            );
        }
    }

}

export default ProductTable
