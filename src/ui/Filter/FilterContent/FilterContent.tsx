import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Space, DatePicker, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import { markedValues } from '../model/const';
import { mainTableFilterSelector } from 'store/filters/filtersSelectors';
import {
  MarkedType,
  resetMainTableFilter,
  setMainTableFilter,
} from 'store/filters/filtersSlice';
import { RangeValue } from '../model/types';

const { RangePicker } = DatePicker;

export const FilterContent = () => {
  const dispatch = useDispatch();
  const {
    name: nameDefault,
    marked: markedDefault,
    dateRange: dateRangeDefault,
    dealer: dealerDefault,
  } = useSelector(mainTableFilterSelector);

  const [form] = Form.useForm();

  const [name, setName] = useState(nameDefault);
  const [marked, setMarked] = useState(markedDefault);
  const [dateRange, setDateRange] = useState<
    Record<string, string | undefined> | undefined
  >(dateRangeDefault);
  const [dealer, setDealer] = useState(dealerDefault);

  const initialValues = {
    name: nameDefault.value,
    marked: markedDefault.value,
    date: [
      dateRangeDefault.dateFrom ? dayjs(dateRangeDefault.dateFrom) : null,
      dateRangeDefault.dateTo ? dayjs(dateRangeDefault.dateTo) : null,
    ],
    dealer: dealerDefault.value,
  };

  const resetFieldsStates = useCallback(() => {
    setName(nameDefault);
    setMarked(markedDefault);
    setDateRange(dateRangeDefault);
    setDealer(dealerDefault);
  }, [nameDefault, markedDefault, dateRangeDefault, dealerDefault]);

  const handleReset = () => {
    dispatch(resetMainTableFilter());
    form.resetFields(Object.keys(initialValues));
    resetFieldsStates();
  };

  const handleSubmit = () => {
    dispatch(setMainTableFilter({ name, marked, dateRange, dealer }));
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName({ value: event.target.value });
  };

  const onMarkedChange = (val: MarkedType) => {
    setMarked({ value: val });
  };

  const onDateRangeChange = (_: RangeValue<Dayjs>, dateStrings: string[]) => {
    setDateRange({
      dateFrom: dateStrings.at(0),
      dateTo: dateStrings.at(1),
    });
  };

  const onDealerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDealer({ value: event.target.value });
  };

  return (
    <Form name="main-filter" layout="vertical" form={form}>
      <Row>
        <Space wrap>
          <Col>
            <Form.Item label="Название" name="name">
              <Input
                placeholder="Название содержит"
                prefix={<SearchOutlined />}
                value={name.value}
                onChange={onNameChange}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Статус разметки" name="marked">
              <Select
                style={{ width: 140 }}
                options={markedValues}
                value={marked.value}
                onChange={onMarkedChange}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Дата" name="date">
              <RangePicker
                locale={locale}
                value={[dayjs(dateRange?.dateFrom), dayjs(dateRange?.dateTo)]}
                onChange={onDateRangeChange}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Дилер" name="dealer">
              <Input
                placeholder="Название дилера"
                prefix={<SearchOutlined />}
                value={dealer.value}
                onChange={onDealerChange}
              />
            </Form.Item>
          </Col>
        </Space>
      </Row>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          Применить
        </Button>
        <Button type="default" onClick={handleReset}>
          Сбросить фильтр
        </Button>
      </Space>
    </Form>
  );
};
