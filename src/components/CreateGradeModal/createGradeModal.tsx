import React from "react";
import { updateGradeSchema } from "../../features/schemas";
import { Modal } from "../Modal/modal";
import { Formik } from "formik";
import { useAppDispatch } from "../../app/hooks";
import {
  createGradeAPI,
  getRateByModuleGroupIdAPI,
} from "../../features/grade/gradeAPI";

interface PropTypes {
  createModal: boolean;
  setCreateModal: Function;
  homeworkId: number;
  studentId: number;
  moduleGroupId: number;
}

export const CreateGradeModal: React.FC<PropTypes> = React.memo(
  ({
    createModal,
    setCreateModal,
    homeworkId,
    studentId,
    moduleGroupId,
  }): JSX.Element => {
    const gradeNumbersArr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const dispatch = useAppDispatch();

    return (
      <Modal active={createModal} setActive={setCreateModal}>
        <Formik
          initialValues={{ rating: "" }}
          validationSchema={updateGradeSchema}
          onSubmit={(values, { resetForm }) => {
            if (homeworkId && studentId) {
              dispatch(
                createGradeAPI({
                  rating: +values.rating,
                  homeworkId: homeworkId,
                  studentId: studentId,
                })
              ).then((res) => {
                dispatch(getRateByModuleGroupIdAPI(moduleGroupId));
                setCreateModal(false);
              });
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="grade__form">
              <select
                name="rating"
                value={values.rating}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Add grade!
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
          )}
        </Formik>
      </Modal>
    );
  }
);
