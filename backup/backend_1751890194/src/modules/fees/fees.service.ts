
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeeStructure } from './fees.model';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(FeeStructure)
    private feeRepository: Repository<FeeStructure>,
  ) {}

  async calculateMonthlyFee(studentId: number): Promise<number> {
    const feeStructure = await this.feeRepository.findOne({ 
      where: { sportId: 1 } // TODO: Get actual student's sport
    });
    
    if (!feeStructure) throw new Error('Fee structure not found');
    
    const baseFee = feeStructure.levels[0].monthlyFee; // TODO: Get student's level
    return this.applyDiscounts(baseFee, feeStructure.discounts || []);
  }

  private applyDiscounts(baseAmount: number, discounts: any[]): number {
    return discounts.reduce((amount, discount) => {
      return discount.type === 'percentage' 
        ? amount * (1 - discount.value/100)
        : amount - discount.value;
    }, baseAmount);
  }
}
