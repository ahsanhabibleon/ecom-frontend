import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    notification,
    Row,
    Select,
} from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { OptionTypes } from './ShippingComp.types';
import { getDistricts, getDivisions } from './utils';

const { Option } = Select;

const residences = [
    {
        value: 'dhaka',
        label: 'Dhaka',
        children: [
            {
                value: 'dhaka',
                label: 'Dhaka',
            },
            {
                value: 'narayangonj',
                label: 'Narayangonj',
            },
            {
                value: 'munshigonj',
                label: 'Munshigonj',
            },
            {
                value: 'keranigonj',
                label: 'Keranigonj',
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const ShippingComp: React.FC = () => {
    const router = useRouter();
    const redir = (router?.query?.redir || '') as string;
    const [divisions, setDivisions] = useState<OptionTypes[]>([])
    const [districts, setDistricts] = useState([])

    const [form] = Form.useForm();

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 80 }}>
                <Option value="880">+880</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const sendPostRequest = async (payload: any) => {
        try {
            await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.token) {
                        localStorage.setItem('token', data?.token || '');
                        notification.success({
                            message: 'Successfully registered!',
                        })
                        router.push('/' + redir)
                    } else {
                        notification.error({
                            message: 'Error',
                            description: data?.message || "Something went wrong"
                        })
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: error?.message || 'Something went wrong!',
                    })
                })

        } catch (error: any) {
            notification.error({
                message: error?.message || 'Something went wrong!',
            })
        }
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        sendPostRequest({
            name: values.name,
            email: values.email,
            password: values.password,
        })
    };

    const onChange = (changed: any, values: any) => {
        if (changed?.country_of_residence) {
            getDivisions().then((dta: any) => {
                setDivisions(dta?.data?.map((d: any) => {
                    return {
                        label: d?.division,
                        value: d?._id
                    }
                }))
            })
        }

        if (changed?.division) {
            getDistricts(changed?.division).then((dta: any) => {
                setDistricts(dta?.data?.map((d: any) => {
                    return {
                        label: d?.district,
                        value: d?._id
                    }
                }))
            })
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/sign-in')
        }
    }, [])

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="shipping"
            onFinish={onFinish}
            onValuesChange={onChange}
            initialValues={{
                prefix: '880',
            }}
            scrollToFirstError
            className='login_register_form'
            style={{ maxWidth: '500px' }}
        >
            <h1 className='text-center'>Fill up your shipping address:</h1>

            <Form.Item
                name="name"
                label="Full Name"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: 'Please input your full name!', whitespace: true }]}
            >
                <Input placeholder="Full Name" />
            </Form.Item>

            <Form.Item
                name="country_of_residence"
                label="Country of Residence"
                rules={[
                    { required: true, message: 'Please select your country!' },
                ]}
            >
                <Select placeholder="Country of Residence">
                    <Option value="bangladesh">Bangladesh</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="division"
                label="Division"
                rules={[
                    { required: true, message: 'Please select your division!' },
                ]}
            >
                <Select
                    placeholder="Division"
                    disabled={divisions.length < 1}
                    showSearch
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {divisions?.map((d: any) => (
                        <Option key={d?.value} value={d?.value}>{d?.label || ''}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="district"
                label="District"
                rules={[
                    { required: true, message: 'Please select your district!' },
                ]}
            >
                <Select
                    placeholder="District"
                    disabled={districts.length < 1}
                    showSearch
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {districts?.map((d: any) => (
                        <Option key={d?.value} value={d?.value}>{d?.label || ''}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Proceed to payment
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ShippingComp;