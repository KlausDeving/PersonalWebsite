import { TEXTTYPE } from './TEXTTYPE';
import { Block } from './Block';
import { CodeBlock, WhitespaceBlock } from './CodeBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { OrderedListBlock } from './OrderedListBlock';
import { UnorderedListBlock } from './UnorderedListBlock';

export class BlockFactory {
  public static createBlock(
    consecutiveEntry: [number, number[]],
    type: TEXTTYPE,
    lines: string[]
  ): Block {
    let subSection = this.determineSubSection(consecutiveEntry, lines);

    switch (type) {
      case TEXTTYPE.CODE:
        return new CodeBlock(subSection);
      case TEXTTYPE.TEXT:
        return new TextBlock(subSection);
      case TEXTTYPE.WHITESPACE:
        return new WhitespaceBlock(subSection);
      case TEXTTYPE.IMAGE:
        return new ImageBlock(subSection);
      case TEXTTYPE.ORDERED_LIST:
        return new OrderedListBlock(subSection);
      case TEXTTYPE.UNORDERED_LIST:
        return new UnorderedListBlock(subSection);
      default:
        return new WhitespaceBlock(subSection);
    }
  }

  private static determineSubSection(
    consecutiveEntry: [number, number[]],
    lines: string[]
  ): string[] {
    let indices = consecutiveEntry[1];
    let startIndex = indices[0];
    let endIndex = indices[indices.length - 1];
    let subSection: string[] = [];
    if (indices.length == 1) {
      subSection = [lines[startIndex]];
    } else {
      subSection = lines.slice(startIndex, endIndex + 1);
    }
    return subSection;
  }
}
