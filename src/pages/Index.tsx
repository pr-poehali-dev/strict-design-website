import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState('monitoring');

  const menuItems = [
    { id: 'monitoring', label: 'Карты', icon: 'Map' },
    { id: 'devices', label: 'УМ', icon: 'Monitor' },
    { id: 'geomonitoring', label: 'Геомониторинг', icon: 'Globe' },
    { id: 'references', label: 'Справочники', icon: 'BookOpen' },
    { id: 'classifications', label: 'Классификаторы', icon: 'Grid3X3' },
    { id: 'organizations', label: 'Структуры организаций', icon: 'Building' },
    { id: 'users', label: 'Пользователи', icon: 'Users' },
    { id: 'processes', label: 'Рабочие процессы', icon: 'Workflow' }
  ];

  const subMenuItems = [
    'Типы услуг',
    'Адреса',
    'Размещение',
    'Модели камер'
  ];

  const deviceData = {
    id: "18-3623",
    name: "Устройство мониторинга",
    address: "Санкт-Петербург, город Кронштадт, улица Ленина, дом 11/37, литера А",
    guid: "d0a4f90f-b0f6-4b2f-4b2d-934f-f74cc0efaff6",
    status: "Эксплуатация",
    model: "Dahua VTO2101X-P",
    specs: {
      category: "IP-камера",
      video: "Да",
      audio: "Нет", 
      dynamics: "Нет",
      zoom: "Нет",
      ptz: "Нет",
      ir: "15"
    },
    network: {
      camera: "10.242.190.66",
      lock: "10.242.190.65", 
      audio: "10.242.190.64"
    },
    coordinates: {
      width: "60.008262",
      longitude: "29.724457",
      azimuth: "306",
      height: "7"
    }
  };

  const checkResults = [
    { param: "Сигнал связности ICMP PING", status: "success" },
    { param: "Доступ по 80 порту", status: "success" },
    { param: "Доступ по 554 порту", status: "warning" },
    { param: "Проверка параметров NTP", status: "error" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Icon name="CheckCircle" size={16} className="text-green-600" />;
      case 'warning': return <Icon name="AlertTriangle" size={16} className="text-yellow-600" />;
      case 'error': return <Icon name="XCircle" size={16} className="text-red-600" />;
      default: return <Icon name="Circle" size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Dark Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={24} className="text-blue-400" />
            <span className="font-semibold">Портал подрядчика</span>
          </div>
        </div>
        
        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                activeSection === item.id ? 'bg-gray-700 border-r-2 border-blue-400' : ''
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
          
          <Separator className="my-4 bg-gray-700" />
          
          <div className="px-4 py-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Справочники</p>
            {subMenuItems.map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Icon name="Camera" size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{deviceData.name}: {deviceData.id}</h1>
                <p className="text-sm text-gray-600">{deviceData.address}</p>
                <p className="text-xs text-gray-500">GUID: {deviceData.guid}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                Статус: {deviceData.status}
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="Edit" size={16} className="mr-2" />
                Сменить статус
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          {/* Image Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Последний доступный скриншот</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Camera" size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Нет доступного изображения</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Скриншот из базы эталонных изображений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Image" size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Эталонное изображение</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Место установки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-orange-100 rounded border flex items-center justify-center relative">
                  <div className="text-center">
                    <Icon name="MapPin" size={32} className="text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-orange-700">Карта местоположения</p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Icon name="ZoomIn" size={20} className="text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Technical Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Технические параметры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Категория УМ</p>
                  <p className="text-sm text-gray-600">{deviceData.specs.category}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Модель УМ</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{deviceData.model}</span>
                    <Icon name="Info" size={16} className="text-gray-400" />
                  </div>
                </div>

                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Видеопоток</TableCell>
                      <TableCell>{deviceData.specs.video}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Аудиопоток</TableCell>
                      <TableCell>{deviceData.specs.audio}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Динамик</TableCell>
                      <TableCell>{deviceData.specs.dynamics}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ZOOM</TableCell>
                      <TableCell>{deviceData.specs.zoom}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PTZ</TableCell>
                      <TableCell>{deviceData.specs.ptz}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Подсветка (м.)</TableCell>
                      <TableCell>{deviceData.specs.ir}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Сетевые адреса</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IP-адрес камеры:</span>
                      <span className="text-sm font-mono">{deviceData.network.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IP-адрес замка:</span>
                      <span className="text-sm font-mono">{deviceData.network.lock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IP-адрес аудиообмена:</span>
                      <span className="text-sm font-mono">{deviceData.network.audio}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Сервис</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Сервисный идентификатор УМ</p>
                  <p className="text-sm font-mono text-gray-600">{deviceData.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Тип услуги</p>
                  <p className="text-sm text-gray-600">3 (третий тип, поворотная)</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Контакт</p>
                  <p className="text-sm text-gray-600">№140</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Оператор</p>
                  <p className="text-sm text-gray-600">ПАО "Ростелеком"</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Адрес по контакту</p>
                  <p className="text-sm text-gray-600">{deviceData.address}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Объект наблюдения</p>
                  <p className="text-sm text-gray-600">Комплекс объектов дорожно-уличной сети</p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Результат проверки от 10.06.2025 20:04</h4>
                  <p className="text-sm text-red-600 mb-3">Есть замечания</p>
                  
                  <div className="space-y-2">
                    {checkResults.map((result, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {getStatusIcon(result.status)}
                        <span className="text-sm text-gray-600">{result.param}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Место установки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Широта</TableCell>
                      <TableCell className="font-mono">{deviceData.coordinates.width}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Долгота</TableCell>
                      <TableCell className="font-mono">{deviceData.coordinates.longitude}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Азимут</TableCell>
                      <TableCell>{deviceData.coordinates.azimuth}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Высота подвеса</TableCell>
                      <TableCell>{deviceData.coordinates.height}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Парадная</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Объект размещения</span>
                    <Icon name="ExternalLink" size={16} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Фасад здания (78-10221-0-1)</p>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Район</span>
                    <span className="text-sm text-gray-600">Кронштадтский</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Тип строения</span>
                    <span className="text-sm text-gray-600">жилой дом</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">В охранной зоне</span>
                    <span className="text-sm text-gray-600">НЕТ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Адрес по РГИС</span>
                    <span className="text-sm text-gray-600 text-right">
                      Санкт-Петербург, город Кронштадт, улица Ленина, дом 11/37, литера А
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-4">
            <p>Версия: 1.2025.06 (016226), релиз от 10.06.2025 16:26</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;