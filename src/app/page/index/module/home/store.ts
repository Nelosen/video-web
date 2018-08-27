import {observable, action} from 'mobx'


class Store {
    @observable public teamList: any = [
        {
            icon:'Icon4',
            id: 1,
            title: '信息化战略规划',
            text: '通过对企业总体战略的解读，尤其是仔细分析企事业总体战略达成的执行路径，以及影响企业总体战略达成的业务和管理痛点，结合企业当前的信息化状况，对企业战略执行所匹配的总体信息化蓝图加以规划。'
        },
        {
            id: 2,
            icon:'Icon4',
            title: '独立项目式信息化咨询',
            text: '在企业自身人员受制于能力、视野、历练等因素，无法在广锦咨询辅导下，以自己为主实施相应阶段的信息化建设推进工作时，双方签订以广锦咨询为主、客户有效配合为辅的项目式合作合同。'
        },
        {
            id: 3,
            icon:'Icon4',
            title: '因专业而权威、因实战而可托付',
            text: '信息化咨询团队核心成员，从业经历完整覆盖SAP、ORACLE等国内外主流信息化厂商，辅以甲方CIO以及管理咨询公司执业背景，有助于客户快速得到信息化建设各个阶段的专业建议和高效点拨。'
        },
        {
            id: 4,
            icon:'Icon4',
            title: '三方无缝配合',
            text: '凡是应该企业自身完成的工作内容，我们绝不越俎代庖但要辅导其能力提升；凡是应该信息化厂商完成的工作，我们透过督促和引导助其与甲方有效配合；视客户信息化工程成败优劣为自己的职业荣辱。'
        }
    ];

    @action
    public changeTeamList(v) {
        this.teamList = v;
    }

}

export const store = new Store();
