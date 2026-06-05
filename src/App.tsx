import { useMemo, useState } from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Collapse,
  ConfigProvider,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Progress,
  Rate,
  Result,
  Row,
  Segmented,
  Space,
  Statistic,
  Steps,
  Switch,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  notification,
  message,
  theme,
} from 'antd'
import {
  BulbOutlined,
  CodeOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FireOutlined,
  FundOutlined,
  GithubOutlined,
  GlobalOutlined,
  MoonOutlined,
  ProjectOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  StarOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons'
import './App.css'

const { Header, Sider, Content, Footer } = Layout
const { Title, Text, Paragraph } = Typography

type MenuKey = 'profile' | 'experience' | 'skills' | 'projects' | 'contact'

function App() {
  const [selected, setSelected] = useState<MenuKey>('profile')
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [hireModalOpen, setHireModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [msgApi, msgContextHolder] = message.useMessage()
  const { token } = theme.useToken()

  const menuItems = useMemo(
    () => [
      { key: 'profile', icon: <UserOutlined />, label: 'Профиль' },
      { key: 'experience', icon: <FundOutlined />, label: 'Опыт' },
      { key: 'skills', icon: <ToolOutlined />, label: 'Навыки' },
      { key: 'projects', icon: <ProjectOutlined />, label: 'Проекты' },
      { key: 'contact', icon: <CustomerServiceOutlined />, label: 'Контакты' },
    ],
    [],
  )

  const name = 'Дмитрий Берсенев'
  const role = 'Frontend-разработчик'

  const openHire = () => {
    setHireModalOpen(true)
    msgApi.info('Отлично! Расскажите о задаче — разберёмся вместе.')
  }

  const openDrawer = () => {
    setDrawerOpen(true)
    api.info({
      message: 'Образование открыто',
      description: 'Здесь моё образование, сертификаты и дополнительные курсы.',
      placement: 'topRight',
    })
  }

  const onSubmitContact = async (values: {
    name: string
    email: string
    task: string
    urgency: string
    type: string
    comment?: string
  }) => {
    setSubmitted(true)
    api.success({
      message: 'Сообщение отправлено!',
      description: `Имя: ${values.name}. Email: ${values.email}. Задача: ${values.task}.`,
      placement: 'topRight',
      icon: <RocketOutlined />,
    })
    msgApi.success('Получил! Отвечу в ближайшее время.')
  }

  const renderProfile = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero */}
      <div className="hero softShadow">
        <Flex justify="space-between" align="flex-start" wrap="wrap" gap={12}>
          <Space size={14} align="start">
            <Avatar
              size={80}
              style={{
                background: `linear-gradient(135deg, ${token.colorPrimary}, #36cfc9)`,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              ДБ
            </Avatar>
            <div>
              <Space align="center" wrap>
                <Title level={2} style={{ margin: 0 }}>
                  {name}
                </Title>
                <Badge
                  count="в поиске работы"
                  style={{
                    backgroundColor: token.colorSuccess,
                    boxShadow: `0 0 0 1px ${token.colorSuccessBorder} inset`,
                  }}
                />
              </Space>
              <Text type="secondary" style={{ fontSize: 16 }}>
                {role}
              </Text>
              <div style={{ marginTop: 10 }}>
                <Space wrap>
                  <Tag icon={<CodeOutlined />} color="blue">
                    React
                  </Tag>
                  <Tag icon={<FireOutlined />} color="volcano">
                    TypeScript
                  </Tag>
                  <Tag icon={<BulbOutlined />} color="gold">
                    CSS / Tailwind
                  </Tag>
                  <Tag icon={<SettingOutlined />} color="green">
                    Git & GitHub
                  </Tag>
                </Space>
              </div>
            </div>
          </Space>

          <Space wrap>
            <Tooltip title="Образование и сертификаты">
              <Button icon={<FileTextOutlined />} onClick={openDrawer}>
                Образование
              </Button>
            </Tooltip>
            <Button
              icon={<GithubOutlined />}
              href="https://github.com/bersenevdima"
              target="_blank"
            >
              GitHub
            </Button>
            <Button type="primary" icon={<RocketOutlined />} onClick={openHire}>
              Связаться
            </Button>
          </Space>
        </Flex>
      </div>

      {/* Stats + About */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="kpiCard softShadow" title="В цифрах">
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Statistic title="Учебных проектов" value={12} prefix={<ProjectOutlined />} />
              <Statistic title="Технологий в стеке" value={10} prefix={<ToolOutlined />} />
              <Statistic title="Месяцев обучения" value={14} prefix={<FundOutlined />} />
              <Divider style={{ margin: '8px 0' }} />
              <Text type="secondary">Мотивация:</Text>
              <Rate allowHalf defaultValue={4.5} />
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card className="kpiCard softShadow" title="Обо мне">
            <Paragraph>
              Я — начинающий frontend-разработчик, сфокусированный на React и современном
              JavaScript. Последний год активно изучаю TypeScript, работу с API и UI-библиотеки
              вроде Ant Design и Tailwind CSS.
            </Paragraph>
            <Paragraph>
              Мне интересно создавать удобные и визуально аккуратные интерфейсы — такие, где
              пользователь не думает «как это работает», а просто делает то, что ему нужно.
            </Paragraph>
            <Paragraph>
              За время учёбы разобрался с React-хуками, роутингом, работой с состоянием (Redux,
              Zustand) и сборкой проектов через Vite. Сейчас хочу попасть в команду, где смогу
              работать над реальными продуктами и расти как разработчик.
            </Paragraph>

            <Divider />

            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="softShadow">
                  <Text type="secondary">Чистота кода</Text>
                  <Progress percent={82} />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="softShadow">
                  <Text type="secondary">Освоение нового</Text>
                  <Progress percent={91} status="active" />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="softShadow">
                  <Text type="secondary">Терпение с багами</Text>
                  <Progress percent={67} />
                </Card>
              </Col>
            </Row>

            <Divider />

            <Alert
              type="info"
              showIcon
              icon={<RocketOutlined />}
              message="Цель"
              description="Найти первую коммерческую позицию Junior Frontend Developer и расти в команде."
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )

  const renderExperience = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card className="softShadow" title="Путь в разработке">
        <Paragraph style={{ marginTop: 0 }}>
          Начал изучать веб-разработку самостоятельно, затем прошёл структурированные курсы.
          Весь путь — через практику и реальные проекты.
        </Paragraph>

        <Timeline
          mode="left"
          items={[
            {
              label: '2022',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>Первые шаги: HTML, CSS, JS</Text>
                  <Text type="secondary">
                    Самостоятельное изучение основ. Первые статичные страницы, адаптивная
                    вёрстка, базовый JavaScript.
                  </Text>
                  <Tag color="gold" icon={<StarOutlined />}>
                    Старт пути
                  </Tag>
                </Space>
              ),
            },
            {
              label: '2023',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>React + курсы по фронтенду</Text>
                  <Text type="secondary">
                    Прошёл курс по React: компоненты, хуки, роутинг. Начал делать учебные
                    проекты с API.
                  </Text>
                  <Tag color="blue" icon={<CodeOutlined />}>
                    React-разработчик
                  </Tag>
                </Space>
              ),
            },
            {
              label: '2024',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>TypeScript, Zustand, Ant Design</Text>
                  <Text type="secondary">
                    Освоил TypeScript на практике, подключал UI-библиотеки, строил более
                    сложные проекты с авторизацией и фильтрацией данных.
                  </Text>
                  <Tag color="purple" icon={<FireOutlined />}>
                    Стек растёт
                  </Tag>
                </Space>
              ),
            },
            {
              label: '2025–сейчас',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>Поиск первой работы + портфолио</Text>
                  <Text type="secondary">
                    Собираю портфолио, дорабатываю проекты, прохожу стажировки и учебные
                    задания. Готов к джуниор-позиции.
                  </Text>
                  <Tag color="green" icon={<TrophyOutlined />}>
                    Ready to hire
                  </Tag>
                </Space>
              ),
            },
          ]}
        />
      </Card>

      <Card className="softShadow" title="Как я подхожу к задачам">
        <Steps
          current={3}
          items={[
            { title: 'Разбираюсь', description: 'Читаю задачу, задаю вопросы' },
            { title: 'Планирую', description: 'Структурирую компоненты и данные' },
            { title: 'Кодирую', description: 'Пишу чисто, итерирую по результату' },
            { title: 'Проверяю', description: 'Тестирую, рефакторю, сдаю' },
          ]}
        />
      </Card>
    </Space>
  )

  const renderSkills = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="softShadow" title="Технологии">
            <List
              bordered
              dataSource={[
                { title: 'React (хуки, контекст, роутинг)', icon: <CodeOutlined /> },
                { title: 'TypeScript — типизация, дженерики', icon: <FireOutlined /> },
                { title: 'CSS / SCSS / Tailwind CSS', icon: <BulbOutlined /> },
                { title: 'Ant Design / UI-библиотеки', icon: <SettingOutlined /> },
                { title: 'REST API, fetch, axios', icon: <GlobalOutlined /> },
                { title: 'Git, GitHub, базовый CI/CD', icon: <GithubOutlined /> },
                { title: 'Vite, Webpack (базово)', icon: <ToolOutlined /> },
                { title: 'Redux Toolkit / Zustand', icon: <FundOutlined /> },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    {item.icon}
                    <Text>{item.title}</Text>
                  </Space>
                </List.Item>
              )}
            />
            <Divider />
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">Уровень React</Text>
              <Progress percent={78} status="active" />
              <Text type="secondary">Уровень TypeScript</Text>
              <Progress percent={65} />
              <Text type="secondary">Уверенность в CSS</Text>
              <Progress percent={85} />
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="softShadow" title="Частые вопросы">
            <Collapse
              accordion
              items={[
                {
                  key: '1',
                  label: 'Умеешь работать в команде?',
                  children: (
                    <Paragraph style={{ margin: 0 }}>
                      Да. Работал в учебных группах, вёл код-ревью, использовал GitHub для
                      совместной разработки с ветками и пул-реквестами.
                    </Paragraph>
                  ),
                },
                {
                  key: '2',
                  label: 'Знаком с бэкендом?',
                  children: (
                    <Paragraph style={{ margin: 0 }}>
                      На базовом уровне — понимаю REST, работу с токенами, структуру запросов.
                      Backend пишу в рамках учебных fullstack-заданий на Node.js.
                    </Paragraph>
                  ),
                },
                {
                  key: '3',
                  label: 'Готов к удалённой работе?',
                  children: (
                    <Paragraph style={{ margin: 0 }}>
                      Да, привык работать самостоятельно, планировать время и держать связь
                      через мессенджеры и тикеты.
                    </Paragraph>
                  ),
                },
              ]}
            />

            <Divider />

            <Tabs
              defaultActiveKey="soft"
              items={[
                {
                  key: 'soft',
                  label: 'Soft skills',
                  children: (
                    <Space wrap>
                      <Tag color="blue">Самостоятельность</Tag>
                      <Tag color="green">Обучаемость</Tag>
                      <Tag color="gold">Внимательность</Tag>
                      <Tag color="purple">Терпение с дебаггером</Tag>
                      <Tag color="volcano">Любопытство</Tag>
                    </Space>
                  ),
                },
                {
                  key: 'tools',
                  label: 'Инструменты',
                  children: (
                    <Space direction="vertical" size={10} style={{ width: '100%' }}>
                      <Alert
                        type="success"
                        showIcon
                        message="Ежедневно"
                        description="VS Code, GitHub, DevTools, Figma (просмотр макетов)"
                      />
                      <Alert
                        type="info"
                        showIcon
                        message="Регулярно"
                        description="Postman, Notion, Jira (учебный), npm/pnpm"
                      />
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )

  const renderProjects = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card className="softShadow" title="Учебные и личные проекты">
        <Carousel autoplay dotPosition="bottom">
          <div>
            <Card className="softShadow" style={{ borderRadius: 18 }}>
              <Space align="start">
                <Avatar
                  size={48}
                  style={{ background: token.colorPrimary }}
                  icon={<GlobalOutlined />}
                />
                <div>
                  <Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>
                    React Frontend Dev Portfolio
                  </Title>
                  <Text type="secondary">
                    Персональное портфолио на React. Секции: About, Skills, Projects, Timeline.
                    Адаптивная вёрстка, деплой на GitHub Pages.
                  </Text>
                  <div style={{ marginTop: 8 }}>
                    <Space wrap>
                      <Tag color="blue">React</Tag>
                      <Tag color="gold">SCSS</Tag>
                      <Tag color="green">GitHub Pages</Tag>
                    </Space>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Button
                      size="small"
                      icon={<GithubOutlined />}
                      href="https://github.com/bersenevdima/react-frontend-dev-portfolio"
                      target="_blank"
                    >
                      GitHub
                    </Button>
                    &nbsp;
                    <Button
                      size="small"
                      type="primary"
                      icon={<GlobalOutlined />}
                      href="https://bersenevdima.github.io/react-frontend-dev-portfolio/"
                      target="_blank"
                    >
                      Live
                    </Button>
                  </div>
                </div>
              </Space>
            </Card>
          </div>

          <div>
            <Card className="softShadow" style={{ borderRadius: 18 }}>
              <Space align="start">
                <Avatar
                  size={48}
                  style={{ background: '#36cfc9' }}
                  icon={<CodeOutlined />}
                />
                <div>
                  <Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>
                    Мини-приложение: Movie Search
                  </Title>
                  <Text type="secondary">
                    SPA для поиска фильмов через OMDB API. Фильтрация, пагинация, детали
                    фильма, роутинг через React Router.
                  </Text>
                  <div style={{ marginTop: 8 }}>
                    <Space wrap>
                      <Tag color="blue">React</Tag>
                      <Tag color="volcano">TypeScript</Tag>
                      <Tag color="purple">REST API</Tag>
                      <Tag color="gold">React Router</Tag>
                    </Space>
                  </div>
                </div>
              </Space>
            </Card>
          </div>

          <div>
            <Card className="softShadow" style={{ borderRadius: 18 }}>
              <Space align="start">
                <Avatar
                  size={48}
                  style={{ background: '#ff7a45' }}
                  icon={<ProjectOutlined />}
                />
                <div>
                  <Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>
                    Task Manager (учебный)
                  </Title>
                  <Text type="secondary">
                    Kanban-доска с drag-and-drop, авторизацией и локальным хранилищем. Zustand
                    для управления состоянием, Tailwind для стилей.
                  </Text>
                  <div style={{ marginTop: 8 }}>
                    <Space wrap>
                      <Tag color="blue">React</Tag>
                      <Tag color="green">Zustand</Tag>
                      <Tag color="cyan">Tailwind</Tag>
                    </Space>
                  </div>
                </div>
              </Space>
            </Card>
          </div>

          <div>
            <Card className="softShadow" style={{ borderRadius: 18 }}>
              <Space align="start">
                <Avatar
                  size={48}
                  style={{ background: '#722ed1' }}
                  icon={<ThunderboltOutlined />}
                />
                <div>
                  <Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>
                    UI-компоненты: Ant Design Dashboard
                  </Title>
                  <Text type="secondary">
                    Учебный дашборд на Ant Design с таблицами, графиками, формами и
                    адаптивным сайдбаром. Именно этот файл — его результат.
                  </Text>
                  <div style={{ marginTop: 8 }}>
                    <Space wrap>
                      <Tag color="blue">React</Tag>
                      <Tag color="purple">Ant Design</Tag>
                      <Tag color="volcano">TypeScript</Tag>
                    </Space>
                  </div>
                </div>
              </Space>
            </Card>
          </div>
        </Carousel>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card className="softShadow" title="Что умею объяснить">
            <List
              size="small"
              dataSource={[
                'Как работает виртуальный DOM в React',
                'Зачем нужен useCallback и useMemo',
                'Разница между controlled и uncontrolled компонентами',
                'Как типизировать пропсы в TypeScript',
                'Что такое замыкание в JavaScript',
                'Как работает flex и grid в CSS',
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <SafetyCertificateOutlined style={{ color: token.colorSuccess }} />
                    <Text>{item}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="softShadow" title="Что хочу освоить дальше">
            <List
              size="small"
              dataSource={[
                'Next.js — SSR и App Router',
                'Тестирование: Vitest + Testing Library',
                'GraphQL на практике',
                'Docker и базовый DevOps',
                'Accessibility (a11y) в интерфейсах',
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <RocketOutlined style={{ color: token.colorPrimary }} />
                    <Text>{item}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )

  const renderContact = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card className="softShadow" title="Написать мне">
        {!submitted ? (
          <>
            <Alert
              type="info"
              showIcon
              message="Открыт к предложениям"
              description="Интересуют стажировки, джуниор-позиции и учебные проекты. Отвечу быстро."
              icon={<RocketOutlined />}
              style={{ marginBottom: 16 }}
            />

            <Form
              layout="vertical"
              onFinish={onSubmitContact}
              initialValues={{
                urgency: 'Обычно',
                type: 'Стажировка',
              }}
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Ваше имя"
                    rules={[{ required: true, message: 'Введите имя' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Имя или компания" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Введите email' },
                      { type: 'email', message: 'Некорректный email' },
                    ]}
                  >
                    <Input prefix={<CustomerServiceOutlined />} placeholder="you@example.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="task"
                label="О чём хотите поговорить"
                rules={[{ required: true, message: 'Опишите суть' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Стажировка, проект, вопрос по коду..."
                />
              </Form.Item>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item name="urgency" label="Срочность">
                    <Segmented options={['Обычно', 'Срочно', 'Когда удобно']} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="type" label="Тип предложения">
                    <Segmented options={['Стажировка', 'Проект', 'Просто познакомиться', 'Другое']} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="comment" label="Дополнительно (необязательно)">
                <Input placeholder="Ссылка на вакансию, проект, что угодно..." />
              </Form.Item>

              <Space wrap>
                <Button type="primary" htmlType="submit" icon={<RocketOutlined />}>
                  Отправить
                </Button>
                <Button
                  icon={<GithubOutlined />}
                  href="https://github.com/bersenevdima"
                  target="_blank"
                >
                  GitHub
                </Button>
                <Button
                  icon={<GlobalOutlined />}
                  href="https://bersenevdima.github.io/react-frontend-dev-portfolio/"
                  target="_blank"
                >
                  Портфолио
                </Button>
              </Space>
            </Form>
          </>
        ) : (
          <Result
            status="success"
            title="Сообщение отправлено!"
            subTitle="Спасибо за интерес. Постараюсь ответить как можно быстрее."
            extra={[
              <Button
                key="again"
                onClick={() => {
                  setSubmitted(false)
                  msgApi.info('Можно отправить ещё одно — отвечу на все.')
                }}
              >
                Написать ещё
              </Button>,
              <Button
                key="github"
                type="primary"
                icon={<GithubOutlined />}
                href="https://github.com/bersenevdima"
                target="_blank"
              >
                GitHub
              </Button>,
            ]}
          />
        )}
      </Card>
    </Space>
  )

  const content = (() => {
    switch (selected) {
      case 'profile':
        return renderProfile()
      case 'experience':
        return renderExperience()
      case 'skills':
        return renderSkills()
      case 'projects':
        return renderProjects()
      case 'contact':
        return renderContact()
      default:
        return renderProfile()
    }
  })()

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 14,
          colorPrimary: '#2563eb',
        },
      }}
    >
      {contextHolder}
      {msgContextHolder}

      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={240}
          style={{
            background: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div style={{ padding: 16 }}>
            <Space>
              <Avatar
                style={{
                  background: `linear-gradient(135deg, #2563eb, #36cfc9)`,
                  fontWeight: 700,
                }}
              >
                ДБ
              </Avatar>
              {!collapsed && (
                <div>
                  <Text strong>{name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {role}
                  </Text>
                </div>
              )}
            </Space>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[selected]}
            items={menuItems}
            onClick={(e) => setSelected(e.key as MenuKey)}
            style={{ borderRight: 0 }}
          />

          <div style={{ padding: 16 }}>
            <Card size="small" className="softShadow" style={{ borderRadius: 12 }}>
              <Space direction="vertical" style={{ width: '100%' }} size={8}>
                <Text type="secondary">Готовность к работе</Text>
                <Text strong>Открыт к офферам</Text>
                <Progress percent={100} size="small" status="active" />
              </Space>
            </Card>
          </div>
        </Sider>

        <Layout>
          <Header
            style={{
              background: token.colorBgContainer,
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              padding: '0 16px',
            }}
          >
            <Flex align="center" justify="space-between">
              <Space align="center" wrap>
                <Title level={4} style={{ margin: 0 }}>
                  Портфолио Frontend-разработчика
                </Title>
                <Tag icon={<CodeOutlined />} color="blue">
                  Junior
                </Tag>
              </Space>

              <Space wrap>
                <Tooltip title={darkMode ? 'Светлая тема' : 'Тёмная тема'}>
                  <Switch
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<BulbOutlined />}
                    checked={darkMode}
                    onChange={(v) => {
                      setDarkMode(v)
                      msgApi.info(v ? 'Тёмная тема включена 🌙' : 'Светлая тема 🌞')
                    }}
                  />
                </Tooltip>
                <Button
                  icon={<GithubOutlined />}
                  href="https://github.com/bersenevdima"
                  target="_blank"
                >
                  GitHub
                </Button>
                <Button type="primary" onClick={openHire} icon={<RocketOutlined />}>
                  Связаться
                </Button>
              </Space>
            </Flex>
          </Header>

          <Content style={{ padding: 16 }}>
            <div style={{ maxWidth: 1180, margin: '0 auto' }}>{content}</div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Дмитрий Берсенев · Frontend Developer ·{' '}
              <a href="https://github.com/bersenevdima" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Text>
          </Footer>
        </Layout>

        {/* Drawer: Education */}
        <Drawer
          title="Образование и сертификаты"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={480}
        >
          <Tabs
            defaultActiveKey="edu"
            items={[
              {
                key: 'edu',
                label: 'Образование',
                children: (
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    <Alert
                      type="success"
                      showIcon
                      message="Высшее образование"
                      description="Техническая специальность. Базовые навыки алгоритмического мышления и работы с документацией."
                      icon={<TrophyOutlined />}
                    />
                    <Alert
                      type="info"
                      showIcon
                      message="Курс: React — полный курс"
                      description="Практический курс по React: хуки, контекст, роутинг, API. Итоговый проект — Movie App."
                    />
                    <Alert
                      type="info"
                      showIcon
                      message="Курс: TypeScript для фронтенда"
                      description="Типизация, дженерики, работа с интерфейсами. Практика на реальных учебных проектах."
                    />
                    <Alert
                      type="warning"
                      showIcon
                      message="Курс: HTML & CSS (Hexlet / собственное обучение)"
                      description="Адаптивная вёрстка, Flexbox, Grid, SCSS. Старт карьеры в вебе."
                    />
                  </Space>
                ),
              },
              {
                key: 'certs',
                label: 'Сертификаты',
                children: (
                  <List
                    itemLayout="vertical"
                    dataSource={[
                      {
                        title: 'React — полный курс',
                        text: 'Сертификат о прохождении курса по React.',
                      },
                      {
                        title: 'JavaScript — основы',
                        text: 'Сертификат об изучении основ JS: замыкания, прототипы, async/await.',
                      },
                      {
                        title: 'Git и GitHub',
                        text: 'Практический курс по работе с системой контроля версий.',
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<SafetyCertificateOutlined />} style={{ background: token.colorSuccess }} />}
                          title={
                            <Space>
                              <Text strong>{item.title}</Text>
                              <Tag color="green">✓</Tag>
                            </Space>
                          }
                          description={item.text}
                        />
                      </List.Item>
                    )}
                  />
                ),
              },
              {
                key: 'plans',
                label: 'Планы',
                children: (
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    <Card className="softShadow" style={{ borderRadius: 12 }} title="Что дальше">
                      <Space direction="vertical" style={{ width: '100%' }} size={10}>
                        <Space>
                          <Badge status="processing" />
                          <Text>Изучить Next.js и SSR</Text>
                        </Space>
                        <Space>
                          <Badge status="processing" />
                          <Text>Добавить тесты в проекты (Vitest)</Text>
                        </Space>
                        <Space>
                          <Badge status="default" />
                          <Text>Разобраться с Docker</Text>
                        </Space>
                        <Space>
                          <Badge status="default" />
                          <Text>Попасть в первую команду 🚀</Text>
                        </Space>
                      </Space>
                    </Card>
                    <Card className="softShadow" style={{ borderRadius: 12 }} title="Мотивация">
                      <Paragraph style={{ marginTop: 0 }}>
                        Люблю, когда код понятен с первого взгляда и интерфейс работает без
                        сюрпризов. Именно это и хочу делать каждый день.
                      </Paragraph>
                    </Card>
                  </Space>
                ),
              },
            ]}
          />
        </Drawer>

        {/* Modal: Contact */}
        <Modal
          title="Написать Дмитрию"
          open={hireModalOpen}
          onCancel={() => setHireModalOpen(false)}
          onOk={() => {
            setHireModalOpen(false)
            api.success({
              message: 'Отлично!',
              description: 'Перейдите в раздел «Контакты» для заполнения формы.',
              placement: 'topRight',
              icon: <RocketOutlined />,
            })
            setSelected('contact')
          }}
          okText="Перейти к форме"
          cancelText="Закрыть"
        >
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <Alert
              type="success"
              showIcon
              message="Открыт к предложениям"
              description="Интересны стажировки, джуниор-позиции и учебные коллаборации."
            />
            <Card className="softShadow" style={{ borderRadius: 12 }}>
              <Space direction="vertical" size={6} style={{ width: '100%' }}>
                <Text type="secondary">Стек</Text>
                <Space wrap>
                  <Tag color="blue">React</Tag>
                  <Tag color="volcano">TypeScript</Tag>
                  <Tag color="gold">Tailwind</Tag>
                  <Tag color="purple">Ant Design</Tag>
                  <Tag color="green">Git</Tag>
                </Space>
                <Divider style={{ margin: '10px 0' }} />
                <Text type="secondary">Мотивация</Text>
                <Rate defaultValue={5} />
              </Space>
            </Card>
          </Space>
        </Modal>
      </Layout>
    </ConfigProvider>
  )
}

export default App