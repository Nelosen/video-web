import * as React from 'react';
import {observer} from 'mobx-react';
import * as styles from './style.pcss';

@observer
export class Footer extends React.Component<any, any> {
    public render() {

        return (
            <div className={styles.footer}>
                <div className={styles.footerDiv}>
                    <div className={styles.footerDivLeft}>
                        <h3>关于广锦</h3>
                        <p>广锦商务咨询成立于2018年4月，致力于技术咨询，商务信息咨询，企业管理咨询”</p>
                    </div>
                    <div className={styles.footerDivRight}>
                        <h3>联系我们</h3>
                        <p>您可以通过以下途径和我们取得联系</p>
                        <p>15579753601</p>
                        <p>gjswr123@sohu.com</p>
                    </div>
                </div>

            </div>
        )
    }
}
