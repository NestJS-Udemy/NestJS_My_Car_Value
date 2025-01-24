import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report';

@Controller('reports')
export class ReportsController {
  @Post()
  createReport(@Body() body: CreateReportDto) {}
}
