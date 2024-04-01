import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./../../styles/createForm.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectHomework } from "../../features/homework/homeworkSlice";
import {
  createHomeworkAPI,
  getHomeworkByModuleGroupAPI,
} from "../../features/homework/homeworkAPI";

const createHomeworkSchema = Yup.object().shape({
  title: Yup.string().required("Enter homework title!"),
  description: Yup.string().required("Enter homework description!"),
  taskNumber: Yup.string().required("Select task number!"),
});

interface PropTypes {
  moduleGroupsId: number;
  moduleId: number;
  setHomeworkForm: Function;
}

export const CreateHomework: React.FC<PropTypes> = React.memo(
  ({ moduleGroupsId, moduleId, setHomeworkForm }): JSX.Element => {
    const dispatch = useAppDispatch();
    const { homeworks } = useAppSelector(selectHomework);
    const [availableTaskNumbers, setAvailableTaskNumbers] = useState<number[]>(
      []
    );

    useEffect(() => {
      dispatch(getHomeworkByModuleGroupAPI(moduleId)).then((res) => {
        if (res.payload.length) {
          const allTaskNumbers = Array.from({ length: 12 }, (_, i) => i + 1);
          const usedTaskNumbers = res.payload.map(
            (homework: any) => homework.taskNumber
          );
          const filteredTaskNumbers = allTaskNumbers.filter(
            (num) => !usedTaskNumbers.includes(num)
          );
          setAvailableTaskNumbers(filteredTaskNumbers);
        } else {
          setAvailableTaskNumbers(Array.from({ length: 12 }, (_, i) => i + 1));
        }
      });
    }, []);

    return (
      <div className="createHomework">
        <div className="create__form-wrapper">
          <Formik
            initialValues={{ title: "", description: "", taskNumber: "" }}
            validationSchema={createHomeworkSchema}
            onSubmit={(values) => {
              dispatch(
                createHomeworkAPI({
                  taskNumber: +values.taskNumber,
                  title: values.title,
                  description: values.description,
                  moduleGroupsId: moduleGroupsId,
                })
              ).then((res) => {
                dispatch(getHomeworkByModuleGroupAPI(moduleGroupsId));
                setHomeworkForm(false);
              });
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="create__form">
                <select
                  name="taskNumber"
                  value={values.taskNumber}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select task number
                  </option>
                  {availableTaskNumbers.map((elm, i) => {
                    return (
                      <option value={elm} key={i}>
                        {elm}
                      </option>
                    );
                  })}
                </select>
                {errors.taskNumber && touched.taskNumber ? (
                  <p className="error">{errors.taskNumber}</p>
                ) : (
                  <></>
                )}
                <input
                  placeholder="Enter homework title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
                {errors.title && touched.title ? (
                  <p className="error">{errors.title}</p>
                ) : (
                  <></>
                )}
                <textarea
                  placeholder="Enter homework description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                {errors.description && touched.description ? (
                  <p className="error">{errors.description}</p>
                ) : (
                  <></>
                )}
                {!availableTaskNumbers.length ? (
                  <p className="error">You cant create task anymore!</p>
                ) : (
                  <></>
                )}
                <button type="submit" className="success-btn">
                  Add
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
);
