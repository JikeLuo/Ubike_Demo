import Input from '../component/input/Input'
import Table from '../component/Table'
import { useMemo, useState } from 'react';
import useFetchData from '../hooks/useFetchData'
import styled from 'styled-components'

const Main = styled.div`
    width: 100%;
    padding: 1% 5% 5% 5%;
`



const Info = ({ matches }) => {
    const [selected, setSelected] = useState('')
    const [searchData, setSearchData] = useState({})
    const [selectedArea, setSelectedArea] = useState(new Set())
    const { finalData: data } = useFetchData()


    return (
        <Main>
            {Object.keys(data).length !== 0
                ? <>
                    <Input
                        data={data}
                        matches={matches}
                        selected={selected}
                        setSelected={setSelected}
                        setSelectedArea={setSelectedArea}
                        setSearchData={setSearchData}
                    />

                    <Table
                        selectedArea={selectedArea}
                        data={Object.keys(searchData).length === 0
                            ? !!selected
                                ? data[selected]
                                : {}
                            : searchData['台北市']
                        }
                        isSearch={Object.keys(searchData).length !== 0}
                        matches={matches}
                    />
                </>
                : <div>Loading...</div>}
        </Main>
    )
}

export default Info;