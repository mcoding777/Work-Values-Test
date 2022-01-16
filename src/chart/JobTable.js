import { styled as styles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

const StyledTableCell = styles(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ec5990",
    color: theme.palette.common.white,
    fontWeight: "bold",
    border: "2px solid white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#dbdbdb",
    border: "2px solid white",
  },
}));

const StyledTableRow = styles(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
  },
}));

function createData(field, job) {
  return { field, job };
}

export default function JobTable({type, jobs}) {

  // console.log("jobs", jobs);

  const school = {
    1: "중졸 이하",
    2: "고졸",
    3: "전문대졸",
    4: "대졸",
    5: "대학원졸",
  };

  const major = {
    0: "계열무관",
    1: "인문",
    2: "사회",
    3: "교육",
    4: "공학",
    5: "자연",
    6: "의학",
    7: "예체능",
  };

  const rows = Object.keys(type === "school" ? school : major).map((item) => {
    return (
      createData(
        type === "school" ? school[item] : major[item], 
        jobs?.[item]?.join(", ")
      )
    );
  });

  // console.log("rows", rows);

  return (
    <UserTableDiv>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, height: 500 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell align="center">
                  {type === "school" ? "학력" : "전공"}
                </StyledTableCell>
                <StyledTableCell align="center">직업</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" align="center" sx={{ width: 150, fontWeight: "bold" }}>
                    {row?.field}
                  </StyledTableCell>
                <StyledTableCell align="center">{row?.job}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </UserTableDiv>
  );
}

// styled-components
const UserTableDiv = styled.div`
  width: 900px;

  margin: 10px auto;

  & .css-1eorqe0-MuiTableCell-root {
    padding: 30px;
  }
`;