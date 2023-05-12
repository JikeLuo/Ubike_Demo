import styled from "styled-components";



const Main = styled.div`
    width: 100%;
    height: 100%;
    border-radius: ${({ matches }) => matches ? '10px 10px 0 0' : '30px 30px 0 0'};
    overflow: hidden;
    border: 1px solid #AEAEAE;
    margin-top: 30px;
`
const TableArea = styled.table`
    width: 100%;
    height: 60px;
    border-collapse: collapse;
    text-align: center;
    font-size: 18px;
    thead {
        dispaly: block;
        width: 100%;
        background-color: #B5CC22;
        color: white;
    }
    tr {
        height: 70px;
    }
`
const Table = (
    {
        matches,
        data,
        selectedArea,
        isSearch
    }) => {

    return Object.keys(data).length !== 0
        ? <Main matches={matches}>
            <TableArea matches={matches}>
                <thead>
                    <tr>
                        <td>縣市</td>
                        <td>區域</td>
                        <td>站點名稱</td>
                        {!matches && <td>可借車輛</td>}
                        {!matches && <td>可還空位</td>}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(area => {
                        if (!isSearch && !selectedArea.has(area)) return

                        return data[area].map((item, idx) => (
                            <tr
                                key={item.ar}
                                style={idx % 2 === 1 ? { backgroundColor: '#F7F7F7' } : {}}
                            >
                                <td style={!matches ? { width: '10%' } : { width: '20%' }}>台北市</td>
                                <td style={!matches ? { width: '20%' } : { width: '20%' }}>{area}</td>
                                <td style={!matches ? { width: '50%' } : { width: '60%' }}>{item.ar}</td>
                                {!matches && <td style={{ width: '10%', color: '#B5CC22' }}>{item.sbi}</td>}
                                {!matches && <td style={{ width: '10%', color: '#B5CC22' }}>{item.bemp}</td>}
                            </tr>
                        ))

                    })}

                </tbody>
            </TableArea>
        </Main>
        : <div>請選擇一個城市 </div>

}

export default Table;