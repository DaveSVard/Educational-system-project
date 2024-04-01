import React, { useEffect, useState } from "react"
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectGroup } from "../../features/group/groupSlice";
import { selectModule } from "../../features/module/moduleSlice";
import { changeGroupModuleAPI, getAllGroupesAPI } from "../../features/group/groupAPI";
import { getAllModulesAPI } from "../../features/module/moduleAPI";
import "./../../styles/seeSubjects.scss"


const changeGroupesModuleSchema = Yup.object().shape({
    activeModuleId: Yup.number().required("Select new module!")
});

export const SeeGroupes:React.FC = ():JSX.Element => {
    
    const dispatch = useAppDispatch()
    const {groupes} = useAppSelector(selectGroup)
    const {modules} = useAppSelector(selectModule)
    let role: any = localStorage.role ? JSON.parse(localStorage.role) : null;

    useEffect(() => {
        dispatch(getAllGroupesAPI())
        dispatch(getAllModulesAPI())
    }, [])

    const [openInputId, setOpenInputId] = useState<number|null>(null);

    const toggleInputs = (id: number) => {
        setOpenInputId(prevId => (prevId === id ? null : id))
    }

    return(
        <div className="subject">
            <div className="container">
                <div className="subject__wrapper">
                    <div className="subject__title">
                        <h1 className="title">See All Groupes</h1>
                    </div>

                    <div className="subject__items">
                        {groupes.map(elm => {
                            return(
                                <div key={elm.id} className="subject__items-item">
                                    <div className="subject__items-item__wrapper">
                                        <div className="subject__items-item__info">
                                            <p><span className="desc">Name:</span> {elm.name}</p>
                                            {role == "0" ? <Link to={"/seeSingleGroup/" + elm.id}>See more</Link> : <></>}
                                        </div>
                                        <div className="subject__items-item__btns">
                                            <button onClick={() => toggleInputs(elm.id)}>
                                                <i className="fa-solid fa-pencil" ></i>
                                            </button>
                                        </div>
                                    </div>
                                    {openInputId == elm.id ? 
                                    <div className="subject__form-wrapper">
                                        <Formik 
                                            initialValues={{activeModuleId: 0}}
                                            validationSchema={changeGroupesModuleSchema}
                                            onSubmit={(values, { setSubmitting }) => {
                                                dispatch(changeGroupModuleAPI({id: elm.id, newModule: values.activeModuleId}))
                                            }}
                                        >
                                            {({
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleSubmit,
                                            }) => (
                                                <form  onSubmit={handleSubmit} className="subject__item-upgrade--second">
                                                    <div className="">
                                                        <select name="activeModuleId" value={values.activeModuleId} onChange={handleChange}>
                                                            <option value="" hidden>Change module</option>
                                                            {modules.map(elm => {
                                                                return(
                                                                    <option key={elm.id} value={elm.id}>{elm.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {errors.activeModuleId && touched.activeModuleId ? <p className="error">{errors.activeModuleId}</p> : <></>}
                                                    </div>
                                                    <button type="submit" className="success-btn">Save</button> 
                                                </form>
                                            )}
                                        </Formik>

                                    </div>
                                     : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}