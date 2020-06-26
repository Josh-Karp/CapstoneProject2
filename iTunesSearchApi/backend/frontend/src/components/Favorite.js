import React from "react";
import { Table } from "react-bootstrap";
import '../style/Favorite.css';

export default props => {
    const { favoriteList } = props;

    return (
        <div className="favorite">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="row-container">
                        {favoriteList.map(item => {
                            return (
                                <div>
                                    <a key={item.id} href={item.link}>
                                        <td className="favorite-wraper">
                                            <img
                                                className="favourite-image"
                                                src={item.img}
                                                alt={item.title}
                                            />
                                        </td>
                                        <td className="favorite-username">{item.title}</td>
                                    </a>
                                </div>
                            );
                        })}
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};