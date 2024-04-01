import React, { useState } from "react";
import { Modal } from "../Modal/modal";
import { Formik } from "formik";
import { updateGradeSchema } from "../../features/schemas";
import { useAppDispatch } from "../../app/hooks";
import {
  deleteGradeAPI,
  getRateByModuleGroupIdAPI,
  updateGradeAPI,
} from "../../features/grade/gradeAPI";

interface PropTypes {
  updateModal: boolean;
  setUpdateModal: Function;
  gradeId: number;
  moduleGroupId: number;
}

export const UpdateGradeModal: React.FC<PropTypes> = React.memo(
  ({ updateModal, setUpdateModal, gradeId, moduleGroupId }): JSX.Element => {
    const gradeNumbersArr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dispatch = useAppDispatch();

    const [deleteGradeMessageModal, setDeleteGradeMessageModal] =
      useState<boolean>(false);
    console.log(deleteGradeMessageModal);

    return (
      <Modal active={updateModal} setActive={setUpdateModal}>
        <Formik
          initialValues={{ rating: "" }}
          validationSchema={updateGradeSchema}
          onSubmit={(values, { resetForm }) => {
            if (gradeId) {
              dispatch(
                updateGradeAPI({ gradeId: gradeId, rating: +values.rating })
              ).then((res) => {
                dispatch(getRateByModuleGroupIdAPI(moduleGroupId));
                setUpdateModal(false);
              });
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <div className="grade">
              {!deleteGradeMessageModal ? (
                <form onSubmit={handleSubmit} className="grade__form">
                  <select
                    name="rating"
                    value={values.rating}
                    onChange={handleChange}
                  >
                    <option value="" hidden>
                      Update grade!
                    </option>
                    {gradeNumbersArr.map((elm, i) => {
                      return (
                        <option value={elm} key={i}>
                          {elm}
                        </option>
                      );
                    })}
                  </select>
                  {errors.rating && touched.rating ? (
                    <p className="error">{errors.rating}</p>
                  ) : (
                    <></>
                  )}
                  <button type="submit" className="success-btn">
                    Save!
                  </button>
                </form>
              ) : (
                <></>
              )}

              {!deleteGradeMessageModal ? (
                <button
                  className="deleteGradeBtn"
                  onClick={() => {
                    setDeleteGradeMessageModal(true);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              ) : (
                <></>
              )}

              {deleteGradeMessageModal ? (
                <div className="deleteGradeMessage">
                  <h2>Are you sure?</h2>
                  <div className="deleteGradeBtns">
                    <button
                      onClick={() => setUpdateModal(false)}
                      className="delete-btn-2"
                    >
                      No!
                    </button>
                    <button
                      onClick={() => {
                        if (gradeId)
                          dispatch(deleteGradeAPI(gradeId)).then((res) => {
                            dispatch(getRateByModuleGroupIdAPI(moduleGroupId));
                            setUpdateModal(false);
                          });
                      }}
                      className="success-btn"
                    >
                      Yes!
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </Formik>
      </Modal>
    );
  }
);
