import React, { useEffect, useState } from "react"
import "./../../styles/seeSubjects.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectModule } from "../../features/module/moduleSlice"
import { getAllModulesAPI, getSingleModuleAPI } from "../../features/module/moduleAPI"
import { Link } from "react-router-dom"
import { Modal } from "../../components/Modal/modal"


export const SeeModules:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const {modules, module} = useAppSelector(selectModule)

    useEffect(() => {
        dispatch(getAllModulesAPI())
    }, [])

    const [seeModal, setSeeModal] = useState<boolean>(false)

    const seeAboutModule = (moduleId:number) => {
        dispatch(getSingleModuleAPI(moduleId)).then(res => {
            if(res.payload.course) {
                setSeeModal(true)
            }
        })
    }

    return(
        <div className="subject">
            <div className="container">
                <div className="subject__wrapper">
                    <div className="subject__title">
                        <h1 className="title">See All Modules</h1>
                    </div>

                    <div className="subject__items">
                        {modules.map(elm => {
                            return(
                                <div key={elm.id} className="subject__items-item">
                                    <div className="subject__items-item__wrapper">
                                        <div className="subject__items-item__info">
                                            <p><span className="desc">Name:</span> {elm.name}</p>
                                            <button onClick={() => seeAboutModule(elm.id)}>See more...<i className="fa-regular fa-eye fz-15"></i></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {seeModal ? <Modal active={seeModal} setActive={setSeeModal}>
                        <div className="singleItemInfo">
                            <p><span className="desc">Course:</span> {module.course?.name}</p>
                        </div>
                    </Modal> : <></>}
                </div>
            </div>
        </div>
    )
}