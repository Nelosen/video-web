import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Login} from './login'
import {Footer} from 'component/footer'

@observer
export default class User extends Component<any, any> {
    constructor(){
        super()
    }
    public render() {
        return (
            <div>
               <Login/>
                <Footer />
            </div>
        )
    }
}

