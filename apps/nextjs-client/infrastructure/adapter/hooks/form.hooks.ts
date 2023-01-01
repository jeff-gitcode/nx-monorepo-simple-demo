import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldsProps } from '../../presentation/components/FormFields';
import { fetchForm } from '../redux/form.reducer';

const useFormFields = (): {
  formFields: FieldsProps[];
  config: any;
  schema: any;
  formList: any;
} => {
  const { formFields, config, schema, formList } = useSelector(
    (state: any) => state.form.items
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchForm());
  }, [dispatch]);

  return { formFields, config, schema, formList };
};

export default useFormFields;
