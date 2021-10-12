import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import FormTextInput from "@/Components/Form/FormTextInput";
import FormSelect from "@/Components/Form/FormSelect";
import axios from "axios";
import _ from 'underscore';

const userOptions = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'kid', label: 'Kid' },
];

const CreateDialog = ({ data, setData, ...props }) => {

  const { handleSubmit, control, reset } = useForm();
  const [status, setStatus] = React.useState({ code: null });

  const submit = (formData) => {
    setStatus({ code: null });
    axios.post('/management/users', formData).then(function (response) {
      reset();
      setData({
        ...data,
        users: [
          ...data.users,
          response.data.user
        ]
      });
      setStatus({ code: 'success' });
    }).catch(function (error) {
      setStatus({
        code: 'error',
        messages: _.flatten(_.values(error.response.data.errors))
      });
    });
  }

  return (
    <Dialog {...props}>
      <form className="bg-transparent rounded-sm overflow-hidden max-w-md" onSubmit={handleSubmit(submit)}>
        <div className="bg-yellow-900 text-white text-center py-4">Create User</div>
        <div className="bg-white p-8 space-y-4">
          {status.code === 'success' &&
            <div className="py-2 text-green-600">
              New User Created!
            </div>
          }
          {status.code === 'error' &&
            <div className="py-2 text-red-500">
              <div>Request Failed</div>
              <ul className="list-disc text-sm pl-6">
                {status.messages.map(message =>
                  <li key={message}>{message}</li>
                )}
              </ul>
            </div>
          }
          {data.tenants.length > 0 &&
            <FormSelect
              control={control}
              name="tenant_id"
              label="Tenant"
              required
              options={data.tenants}
              defaultValue={data.tenants[0].id}
              valueKey="id"
              labelKey="name"
            />
          }
          <FormTextInput control={control} name="name" label="Name" required />
          <FormTextInput control={control} name="nickname" label="Nickname" required />
          <FormSelect
            control={control}
            name="role"
            label="Role"
            required
            options={userOptions}
            defaultValue={userOptions[0].value}
          />
          <FormTextInput control={control} name="password" label="Password" required type="password" />
          <Button variant="contained" color="default" type="submit" fullWidth>
            Add
					</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateDialog;