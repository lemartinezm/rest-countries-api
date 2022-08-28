import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Flex, IconButton, Select, Text } from '@chakra-ui/react';

export type PaginationProps = {
  meta: {
    totalDocuments: number,
    currentPage: number,
    totalPages: number
  };
  onUpdatePagination: (toPage: number) => any
}

export function Pagination ({ meta, onUpdatePagination }: PaginationProps) {
  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'inherit' }}
      gap={2}
    >
      <Text>
        Total results {meta.totalDocuments}
      </Text>
      <ButtonGroup>
        <IconButton
          aria-label='First page'
          icon={<ArrowLeftIcon />}
          isDisabled={meta.currentPage === 1}
          onClick={() => onUpdatePagination(1)}
        />
        <IconButton
          aria-label='Previous page'
          icon={<ChevronLeftIcon />}
          isDisabled={meta.currentPage === 1}
          onClick={() => onUpdatePagination(meta.currentPage - 1)}
        />
        {
          meta.currentPage - 1 > 0
            ? <Button onClick={() => onUpdatePagination(meta.currentPage - 1)} >{meta.currentPage - 1}</Button>
            : null
        }
        <Button disabled>{meta.currentPage}</Button>
        {
          meta.currentPage < meta.totalPages
            ? <Button onClick={() => onUpdatePagination(meta.currentPage + 1)} >{meta.currentPage + 1}</Button>
            : null
        }
        {/* {
          meta.currentPage + 1 < meta.totalPages
            ? <Button onClick={() => onUpdatePagination(meta.currentPage + 2)} >{meta.currentPage + 2}</Button>
            : null
        } */}
        <IconButton
          aria-label='Next page'
          icon={<ChevronRightIcon />}
          isDisabled={meta.currentPage === meta.totalPages}
          onClick={() => onUpdatePagination(meta.currentPage + 1)}
        />
        <IconButton
          aria-label='Last page'
          icon={<ArrowRightIcon />}
          isDisabled={meta.currentPage === meta.totalPages}
          onClick={() => onUpdatePagination(meta.totalPages)}
        />
      </ButtonGroup>

      <Select w={{ base: 'fit-content', md: 'inherit' }} value={meta.currentPage} onChange={(e) => {
        e.preventDefault();
        onUpdatePagination(parseInt(e.target.value));
      }} >
        {
          [...Array(meta.totalPages)].map((x, i) => (
            <option key={`option-${i}`} value={i + 1}>
              {i + 1}
            </option>
          ))
        }
      </Select>

    </Flex>
  );
}
