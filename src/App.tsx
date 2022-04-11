import React, {ChangeEvent, MouseEventHandler} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Container,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {RootStoreType, store} from "./redux/redux";
import {
    AddName,
    AddPrice,
    AddToListAC,
    AddWeight,
    ClearListAC,
    DeleteItemAC,
    SingleFoodType
} from "./redux/foodWeightReducer";
import {Delete} from "@mui/icons-material";

function App() {

    const foodList = useSelector<RootStoreType, Array<SingleFoodType>>(store => store.foodList.foodContainer)
    const inputName = useSelector<RootStoreType, string>(store => store.foodList.InputName)
    const inputWeigh = useSelector<RootStoreType, number>(store => store.foodList.InputWeight)
    const inputPrice = useSelector<RootStoreType, number>(store => store.foodList.InputPrice)
    const outputWeight = useSelector<RootStoreType, string>(store => store.foodList.OutputPricePerKG)
    const dispatch = useDispatch()

    const onNameInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(AddName(e.currentTarget.value))
    }
    const onPriceInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (isFinite(+e.currentTarget.value)) {
            dispatch(AddPrice(+e.currentTarget.value))
        }
    }
    const onWeightInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(AddWeight(+e.currentTarget.value))
    }
    const addToListHandler = () => {
        dispatch(AddToListAC())
    }
    const clearListHandler = () => {
        dispatch(ClearListAC())
    }
    const deleteUnitHandler = (id:string)=>{
        dispatch(DeleteItemAC(id))
    }


    return (
        <div className="App">
            {/*TODO Добавить переключатель светлой и темной темы*/}
            {/*TODO Добавить переключатель литров и килограммов*/}
            {/*TODO Добавить адаптивной верстки*/}

            <hr/>
            <Container>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <div className={'inputContainer'}>
                            <TextField variant={'outlined'} size={'small'} label={'Название'}
                                       onChange={onNameInputChangeHandler} value={inputName}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <div className={'inputContainer'}>
                            <TextField variant={'outlined'} size={'small'} label={'Цена'}
                                       onChange={onPriceInputChangeHandler} value={inputPrice}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <div className={'inputContainer'}>
                            <TextField variant={'outlined'} size={'small'} label={'Вес'}
                                       onChange={onWeightInputChangeHandler} value={inputWeigh}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <div className={'inputContainer'}>
                            <TextField variant={'outlined'} label={'Вес за 1'} defaultValue={"Small"} size={"small"}
                                       disabled
                                       value={outputWeight}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <Button sx={{margin: 'auto'}} variant="contained" onClick={addToListHandler}>Добавить </Button>
                    </Grid>
                </Grid>
            </Container>
            <hr/>
            <Container>
                <Button variant={"contained"} onClick={clearListHandler}>Очистить список</Button>
                <Grid container spacing={2}>
                    {foodList.map(el =>
                        <Grid item xs={12} md={6} lg={2} key={el.id}>
                            <Paper elevation={5} sx={{display:'flex', alignItems:'center'}}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography variant={"h5"}>{`${el.name}`}</Typography>
                                                                            </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{`${el.startPrice}P за ${el.startWeight} гр.`}</Typography><br/>
                                        <Typography>{`${el.finalPrice}P за 1 кг.`}</Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <IconButton onClick={()=> {
                                    deleteUnitHandler(el.id)
                                }} size={'small'} sx={{height:"30px"}}>
                                    <Delete fontSize={'small'} color={'error'}/>
                                </IconButton>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

//@ts-ignore
window.store = store