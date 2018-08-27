import React, {Component} from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom'
import {uiStore} from "../../../UiStore";

export class Bread extends Component<any, any> {

    public render() {
        const list = uiStore.CurrentBreadList;
        return (
            <Breadcrumb style={{margin: '12px 0'}}>
                {
                    list.map((bread, key) => {
                        if (bread.name !== list[0].name && bread.name !== list[list.length - 1].name) {
                            return (
                                <Breadcrumb.Item key={key}>
                                    <Link to={bread.path}>{}</Link>
                                </Breadcrumb.Item>
                            )
                        } else {
                            return <Breadcrumb.Item key={key}>{}</Breadcrumb.Item>
                        }
                    })
                }
            </Breadcrumb>
        )
    }
}

