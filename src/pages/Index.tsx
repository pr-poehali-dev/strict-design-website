import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const cameras = [
    {
      id: "18-0242",
      name: "Лиговский пр., дом 6",
      status: "Подтвержден",
      location: "Санкт-Петербург",
      uptime: 98.5,
      lastCheck: "15:07:2020 10:35:52",
      type: "Уличная камера"
    },
    {
      id: "18-0241",
      name: "Невский пр., дом 28",
      status: "Проверен",
      location: "Санкт-Петербург", 
      uptime: 99.2,
      lastCheck: "15:07:2020 14:55:33",
      type: "Внутренняя камера"
    },
    {
      id: "18-0243",
      name: "Московский пр., дом 15",
      status: "Требует проверки",
      location: "Санкт-Петербург",
      uptime: 85.3,
      lastCheck: "14:07:2020 09:22:15",
      type: "Поворотная камера"
    }
  ];

  const analytics = [
    { label: "Активных камер", value: "47", trend: "+2.5%" },
    { label: "Средняя загрузка", value: "73%", trend: "-1.2%" },
    { label: "Время работы", value: "98.5%", trend: "+0.3%" },
    { label: "Ошибки за месяц", value: "3", trend: "-50%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Подтвержден": return "bg-green-100 text-green-800";
      case "Проверен": return "bg-blue-100 text-blue-800";
      case "Требует проверки": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-open-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name="Video" size={28} className="text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-inter">Система мониторинга камер</h1>
              <p className="text-sm text-gray-600">Отчеты по работе оборудования и аналитика</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-green-700 border-green-200">
              <Icon name="CheckCircle" size={16} className="mr-1" />
              Система работает
            </Badge>
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analytics.map((item, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{item.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={item.trend.startsWith('+') ? "TrendingUp" : "TrendingDown"} 
                      size={16} 
                      className={item.trend.startsWith('+') ? "text-green-600" : "text-red-600"} 
                    />
                    <span className={`text-sm font-medium ${item.trend.startsWith('+') ? "text-green-600" : "text-red-600"}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="cameras" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cameras">Панель камер</TabsTrigger>
            <TabsTrigger value="tech">Тех. параметры</TabsTrigger>
            <TabsTrigger value="service">Сервис</TabsTrigger>
            <TabsTrigger value="location">Места установки</TabsTrigger>
          </TabsList>

          <TabsContent value="cameras" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="MonitorSpeaker" size={20} />
                  <span>Активные камеры наблюдения</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cameras.map((camera) => (
                    <div key={camera.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon name="Camera" size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{camera.name}</h3>
                          <p className="text-sm text-gray-600">ID: {camera.id} • {camera.type}</p>
                          <p className="text-xs text-gray-500">Последняя проверка: {camera.lastCheck}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm text-gray-600">Время работы:</span>
                            <span className="font-semibold">{camera.uptime}%</span>
                          </div>
                          <Progress value={camera.uptime} className="w-24 h-2" />
                        </div>
                        <Badge className={getStatusColor(camera.status)}>
                          {camera.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Icon name="Play" size={16} className="mr-1" />
                          Live
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Cpu" size={20} />
                  <span>Технические параметры оборудования</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Характеристики камеры 18-0242</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Разрешение:</span>
                        <span className="font-medium">1920x1080</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Частота кадров:</span>
                        <span className="font-medium">30 FPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Угол обзора:</span>
                        <span className="font-medium">85°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ночное видение:</span>
                        <span className="font-medium">До 30м</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Питание:</span>
                        <span className="font-medium">PoE 48V</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Производительность сети</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Битрейт:</span>
                        <span className="font-medium">4 Мбит/с</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Задержка:</span>
                        <span className="font-medium">45 мс</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Потери пакетов:</span>
                        <span className="font-medium">0.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Температура:</span>
                        <span className="font-medium">+23°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Загрузка CPU:</span>
                        <span className="font-medium">65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="service" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Wrench" size={20} />
                  <span>Сервисное обслуживание</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="CheckCircle" size={20} className="text-green-600" />
                        <span className="font-semibold text-green-800">Плановое ТО</span>
                      </div>
                      <p className="text-sm text-green-700">Следующее обслуживание через 45 дней</p>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="AlertTriangle" size={20} className="text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Требует внимания</span>
                      </div>
                      <p className="text-sm text-yellow-700">Камера 18-0243 нуждается в калибровке</p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Clock" size={20} className="text-blue-600" />
                        <span className="font-semibold text-blue-800">Последнее ТО</span>
                      </div>
                      <p className="text-sm text-blue-700">15.06.2020 - Замена объектива</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">История обслуживания</h4>
                    <div className="space-y-3">
                      {[
                        { date: "22.07.20 14:55", action: "Крупный Анатолий Дмитриевич", status: "Статус изменен на: Подтвержден" },
                        { date: "10.07.20 08:35", action: "Координатор Арно Та", status: "Статус изменен на: Проверен" },
                        { date: "15.07.20 10:40", action: "Чумак Сергей Тимофеевич", status: "Есть замечания" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                          <Icon name="User" size={16} className="text-gray-400 mt-1" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.action}</p>
                            <p className="text-sm text-gray-600">{item.status}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="MapPin" size={20} />
                  <span>Карта размещения камер</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Map" size={48} className="text-gray-400 mb-2 mx-auto" />
                      <p className="text-gray-600">Интерактивная карта</p>
                      <p className="text-sm text-gray-500">Яндекс.Карты будут загружены</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Адреса установки</h4>
                    {cameras.map((camera) => (
                      <div key={camera.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">{camera.id.split('-')[1]}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{camera.name}</p>
                          <p className="text-sm text-gray-600">{camera.location}</p>
                        </div>
                        <Badge className={getStatusColor(camera.status)}>
                          {camera.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;